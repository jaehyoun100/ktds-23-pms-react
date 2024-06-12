import { useEffect, useRef, useState } from "react";
import { modifySupply, loadSupplyImage } from "../../../http/supplyHttp";

export default function SupplyModification({
  setIsSupplyModificationMode,
  token,
  supplyBody,
  setNeedReload,
}) {
  const supplyNameRef = useRef();
  const supplyCategoryRef = useRef();
  const supplyPriceRef = useRef();
  const supplyStockRef = useRef();
  const supplyImageRef = useRef();
  const supplyDetailRef = useRef();
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      if (supplyBody.splImg) {
        const imageData = await loadSupplyImage({
          splImg: supplyBody.splImg,
          token,
        });
        setImagePreview(imageData);
      }
    };

    fetchImage();
  }, [supplyBody.splImg, token]);

  const onModificationClickHandler = async () => {
    const name = supplyNameRef.current.value;
    const category = supplyCategoryRef.current.value;
    const price = supplyPriceRef.current.value;
    const stock = supplyStockRef.current.value;
    const image = supplyImageRef.current.files[0];
    const detail = supplyDetailRef.current.value;

    const json = await modifySupply(
      token,
      supplyBody.splId,
      name,
      category,
      price,
      stock,
      image,
      detail
    );

    if (json.errors) {
      json.errors.forEach((error) => {
        alert(error);
      });
    } else if (json.body) {
      setIsSupplyModificationMode(false);
      setNeedReload(Math.random());
    }
  };

  const onCancelClickHandler = () => {
    setIsSupplyModificationMode(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="category">카테고리</label>
        <input
          type="text"
          id="category"
          name="category"
          defaultValue={supplyBody.splCtgr}
          ref={supplyCategoryRef}
        />
      </div>
      <div>
        <label htmlFor="name">제품 명</label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={supplyBody.splName}
          ref={supplyNameRef}
        />
      </div>
      <div>
        <label htmlFor="price">제품 가격</label>
        <input
          type="number"
          id="price"
          name="price"
          defaultValue={supplyBody.splPrice}
          ref={supplyPriceRef}
        />
      </div>
      <div>
        <label htmlFor="stock">재고</label>
        <input
          type="number"
          id="stock"
          name="stock"
          defaultValue={supplyBody.invQty}
          ref={supplyStockRef}
        />
      </div>
      <div>
        <label htmlFor="image">이미지</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          ref={supplyImageRef}
          onChange={handleImageChange}
        />
        {imagePreview && (
          <div>
            <img
              src={imagePreview}
              alt="미리보기"
              style={{ width: "100px", height: "100px", marginTop: "10px" }}
            />
          </div>
        )}
      </div>
      <div>
        <label htmlFor="detail">제품 설명</label>
        <textarea
          id="detail"
          name="detail"
          defaultValue={supplyBody.splDtl}
          ref={supplyDetailRef}
        ></textarea>
      </div>
      <div>
        <button onClick={onModificationClickHandler}>수정</button>
        <button onClick={onCancelClickHandler}>취소</button>
      </div>
    </div>
  );
}
