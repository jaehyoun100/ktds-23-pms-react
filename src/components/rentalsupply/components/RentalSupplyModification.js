import { useEffect, useRef, useState } from "react";
import {
  modifyRentalSupply,
  loadRentalSupplyImage,
  loadRentalSupply,
} from "../../../http/rentalSupplyHttp";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function RentalSupplyModification() {
  const { rsplId } = useParams();
  const rentalSupplyNameRef = useRef();
  const rentalSupplyCategoryRef = useRef();
  const rentalSupplyPriceRef = useRef();
  const rentalSupplyStockRef = useRef();
  const rentalSupplyImageRef = useRef();
  const rentalSupplyDetailRef = useRef();
  const [imagePreview, setImagePreview] = useState(null);
  const [rentalSupplyBody, setRentalSupplyBody] = useState(null);

  const { token } = useSelector((state) => state.tokenInfo);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRentalSupply = async () => {
      const json = await loadRentalSupply({
        selectedRsplId: rsplId,
        token,
        needReload: 0,
      });
      setRentalSupplyBody(json.body);

      if (json.body.rsplImg) {
        const imageData = await loadRentalSupplyImage({
          rsplImg: json.body.rsplImg,
          token,
        });
        setImagePreview(imageData);
      }
    };

    fetchRentalSupply();
  }, [rsplId, token]);

  const onModificationClickHandler = async () => {
    const name = rentalSupplyNameRef.current.value;
    const category = rentalSupplyCategoryRef.current.value;
    const price = rentalSupplyPriceRef.current.value;
    const stock = rentalSupplyStockRef.current.value;
    const image = rentalSupplyImageRef.current.files[0];
    const detail = rentalSupplyDetailRef.current.value;

    const json = await modifyRentalSupply(
      token,
      rsplId,
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
      navigate("/rentalsupply");
    }
  };

  const onCancelClickHandler = () => {
    navigate("/rentalsupply");
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      {rentalSupplyBody && (
        <>
          <div>
            <label htmlFor="category">카테고리</label>
            <input
              type="text"
              id="category"
              name="category"
              defaultValue={rentalSupplyBody.rsplCtgr}
              ref={rentalSupplyCategoryRef}
            />
          </div>
          <div>
            <label htmlFor="name">제품 명</label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={rentalSupplyBody.rsplName}
              ref={rentalSupplyNameRef}
            />
          </div>
          <div>
            <label htmlFor="price">제품 가격</label>
            <input
              type="number"
              id="price"
              name="price"
              defaultValue={rentalSupplyBody.rsplPrice}
              ref={rentalSupplyPriceRef}
            />
          </div>
          <div>
            <label htmlFor="stock">재고</label>
            <input
              type="number"
              id="stock"
              name="stock"
              defaultValue={rentalSupplyBody.invQty}
              ref={rentalSupplyStockRef}
            />
          </div>
          <div>
            <label htmlFor="image">이미지</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              ref={rentalSupplyImageRef}
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
              defaultValue={rentalSupplyBody.rsplDtl}
              ref={rentalSupplyDetailRef}
            ></textarea>
          </div>
          <div>
            <button onClick={onModificationClickHandler}>수정</button>
            <button onClick={onCancelClickHandler}>취소</button>
          </div>
        </>
      )}
    </div>
  );
}
