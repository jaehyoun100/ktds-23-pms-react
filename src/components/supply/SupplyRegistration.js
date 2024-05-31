import { useRef } from "react";
import { registerSupply } from "../../http/supplyHttp";

export default function SupplyRegistration({
  setIsRegistrationMode,
  setNeedReload,
  token,
}) {
  const nameRef = useRef();
  const categoryRef = useRef();
  const priceRef = useRef();
  const imageRef = useRef();
  const detailRef = useRef();

  const onCancelClickHandler = () => {
    setIsRegistrationMode(false);
  };

  const onRegisterClickHandler = async () => {
    const name = nameRef.current.value;
    const category = categoryRef.current.value;
    const price = priceRef.current.value;
    const image = imageRef.current.value;
    const detail = detailRef.current.value;

    const json = await registerSupply(
      token,
      name,
      category,
      price,
      image,
      detail
    );

    if (json.errors) {
      json.errors.forEach((error) => {
        alert(error);
      });
    } else if (json.body) {
      setIsRegistrationMode(false);
      setNeedReload(Math.random());
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="category">카테고리</label>
        <input type="text" id="category" ref={categoryRef} />
      </div>
      <div>
        <label htmlFor="name">제품 명</label>
        <input type="text" id="name" ref={nameRef} />
      </div>
      <div>
        <label htmlFor="price">제품 가격</label>
        <input type="number" id="price" ref={priceRef} />
      </div>
      <div>
        <label htmlFor="image">이미지</label>
        <input type="text" id="image" ref={imageRef} />
      </div>
      <div>
        <label htmlFor="detail">제품 설명</label>
        <textarea id="detail" ref={detailRef}></textarea>
      </div>
      <div>
        <button onClick={onRegisterClickHandler}>등록</button>
        <button onClick={onCancelClickHandler}>취소</button>
      </div>
    </div>
  );
}
