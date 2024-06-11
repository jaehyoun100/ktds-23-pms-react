import { useRef } from "react";
import { modifyRentalSupply } from "../../../http/rentalSupplyHttp";

export default function RentalSupplyModification({
  setIsRentalSupplyModificationMode,
  token,
  rentalSupplyBody,
  setNeedReload,
}) {
  const rentalSupplyNameRef = useRef();
  const rentalSupplyCategoryRef = useRef();
  const rentalSupplyPriceRef = useRef();
  const rentalSupplyStockRef = useRef();
  //   const rentalSupplyImageRef = useRef();
  const rentalSupplyDetailRef = useRef();

  const onModificationClickHandler = async () => {
    const name = rentalSupplyNameRef.current.value;
    const category = rentalSupplyCategoryRef.current.value;
    const price = rentalSupplyPriceRef.current.value;
    const stock = rentalSupplyStockRef.current.value;
    const detail = rentalSupplyDetailRef.current.value;

    const json = await modifyRentalSupply(
      token,
      rentalSupplyBody.rsplId,
      name,
      category,
      price,
      stock,
      detail
    );

    if (json.errors) {
      json.errors.forEach((error) => {
        alert(error);
      });
    } else if (json.body) {
      setIsRentalSupplyModificationMode(false);
      setNeedReload(Math.random());
    }
  };

  const onCancelClickHandler = () => {
    setIsRentalSupplyModificationMode(false);
  };

  return (
    <div>
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
      {/* <div>
        <label htmlFor="image">이미지</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          defaultValue={rentalSupplyBody.rsplImg}
          ref={rentalSupplyImageRef}
        />
      </div> */}
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
    </div>
  );
}
