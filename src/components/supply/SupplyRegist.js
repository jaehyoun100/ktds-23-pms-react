import { useState } from "react";
import { registerSupply } from "../../http/supplyHttp";

export default function SupplyRegist({
  setIsRegistrationMode,
  setNeedReload,
  token,
}) {
  const [inputFields, setInputFields] = useState([
    {
      name: "",
      category: "",
      price: "",
      image: null,
      detail: "",
    },
  ]);

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    if (event.target.name === "image") {
      values[index][event.target.name] = event.target.files[0]; // 파일 정보를 저장
    } else {
      values[index][event.target.name] = event.target.value;
    }
    setInputFields(values);
  };

  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      { name: "", category: "", price: "", image: null, detail: "" },
    ]);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const onCancelClickHandler = () => {
    setIsRegistrationMode(false);
  };

  const onRegisterClickHandler = async () => {
    for (const field of inputFields) {
      const { name, category, price, image, detail } = field;
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
    }
  };

  return (
    <>
      {inputFields.map((inputField, index) => (
        <div key={index}>
          <div>
            <label htmlFor={`category-${index}`}>카테고리</label>
            <input
              type="text"
              id={`category-${index}`}
              name="category"
              value={inputField.category}
              onChange={(event) => handleInputChange(index, event)}
            />
          </div>
          <div>
            <label htmlFor={`name-${index}`}>제품 명</label>
            <input
              type="text"
              id={`name-${index}`}
              name="name"
              value={inputField.name}
              onChange={(event) => handleInputChange(index, event)}
            />
          </div>
          <div>
            <label htmlFor={`price-${index}`}>제품 가격</label>
            <input
              type="number"
              id={`price-${index}`}
              name="price"
              value={inputField.price}
              onChange={(event) => handleInputChange(index, event)}
            />
          </div>
          <div>
            <label htmlFor={`image-${index}`}>이미지</label>
            <input
              type="file"
              id={`image-${index}`}
              name="image"
              onChange={(event) => handleInputChange(index, event)}
            />
          </div>
          <div>
            <label htmlFor={`detail-${index}`}>제품 설명</label>
            <textarea
              id={`detail-${index}`}
              name="detail"
              value={inputField.detail}
              onChange={(event) => handleInputChange(index, event)}
            ></textarea>
          </div>
          <div>
            <button type="button" onClick={handleAddFields}>
              +
            </button>
            {inputFields.length > 1 && (
              <button type="button" onClick={() => handleRemoveFields(index)}>
                -
              </button>
            )}
          </div>
        </div>
      ))}
      <div>
        <button onClick={onRegisterClickHandler}>등록</button>
        <button onClick={onCancelClickHandler}>취소</button>
      </div>
    </>
  );
}
