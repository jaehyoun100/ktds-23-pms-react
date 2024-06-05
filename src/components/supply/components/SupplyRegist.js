import { useState } from "react";
import { registerSupply } from "../../../http/supplyHttp";

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
      stock: "",
      image: null,
      imagePreview: null,
      detail: "",
    },
  ]);

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    if (event.target.name === "image") {
      const file = event.target.files[0];
      values[index][event.target.name] = file;
      values[index].imagePreview = URL.createObjectURL(file);
    } else {
      values[index][event.target.name] = event.target.value;
    }
    setInputFields(values);
  };

  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      {
        name: "",
        category: "",
        price: "",
        stock: "",
        image: null,
        imagePreview: null,
        detail: "",
      },
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
      const { name, category, price, stock, image, detail } = field;
      const json = await registerSupply(
        token,
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
            <label htmlFor={`stock-${index}`}>재고</label>
            <input
              type="number"
              id={`stock-${index}`}
              name="stock"
              value={inputField.stock}
              onChange={(event) => handleInputChange(index, event)}
            />
          </div>
          <div>
            <label htmlFor={`image-${index}`}>이미지</label>
            <input
              type="file"
              id={`image-${index}`}
              name="image"
              accept="image/*"
              onChange={(event) => handleInputChange(index, event)}
            />
            {inputField.imagePreview && (
              <div>
                <img
                  src={inputField.imagePreview}
                  alt={`미리보기-${index}`}
                  style={{ width: "100px", height: "100px", marginTop: "10px" }}
                />
              </div>
            )}
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
