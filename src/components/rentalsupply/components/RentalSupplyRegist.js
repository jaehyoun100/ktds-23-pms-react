import { useCallback, useEffect, useMemo, useState } from "react";
import {
  loadRentalSupplyCategory,
  registerRentalSupply,
} from "../../../http/rentalSupplyHttp";
import style from "../rentalSupply.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function RentalSupplyRegist() {
  const [categoryList, setCategoryList] = useState([]);
  const [inputFields, setInputFields] = useState([
    {
      name: "",
      category: "",
      customCategory: "",
      price: "",
      stock: "",
      image: null,
      imagePreview: null,
      detail: "",
    },
  ]);

  const { token } = useSelector((state) => state.tokenInfo);
  const navigate = useNavigate();

  const memoizedLoadRentalSupplyCategory = useCallback(
    loadRentalSupplyCategory,
    []
  );
  const memoizedToken = useMemo(() => {
    return { token };
  }, [token]);

  useEffect(() => {
    const fetchingData = async () => {
      const json = await memoizedLoadRentalSupplyCategory({ ...memoizedToken });
      const categories = json.supplyList.map((item) => item.rsplCtgr);
      setCategoryList(categories);
    };

    fetchingData();
  }, [memoizedLoadRentalSupplyCategory, memoizedToken]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const values = [...inputFields];

    if (name === "image") {
      const file = event.target.files[0];
      values[index][name] = file;
      values[index].imagePreview = URL.createObjectURL(file);
    } else {
      if ((name === "price" || name === "stock") && value.includes("-")) {
        alert("음수는 입력할 수 없습니다.");
        values[index][name] = "";
      } else {
        values[index][name] = value;
      }
    }
    setInputFields(values);
  };

  const onCancelClickHandler = () => {
    navigate(-1);
  };

  const onRegisterClickHandler = async () => {
    for (const field of inputFields) {
      const { name, category, customCategory, price, stock, image, detail } =
        field;
      const finalCategory =
        category === "직접 입력" ? customCategory : category;
      const json = await registerRentalSupply(
        token,
        name,
        finalCategory,
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
        navigate(-1);
      }
    }
  };

  return (
    <div className={style.rentalSupplyRegistContainer}>
      <div className={style.rentalSupplyRegistHeader}>
        <h3>대여품 등록</h3>
      </div>
      {inputFields.map((inputField, index) => (
        <div key={index} className={style.rentalForm}>
          <div className={style.formGroup}>
            <label htmlFor={`category-${index}`}>카테고리</label>
            <select
              id={`category-${index}`}
              name="category"
              value={inputField.category}
              onChange={(event) => handleInputChange(index, event)}
            >
              <option value="">카테고리를 선택하세요</option>
              {categoryList.map((category, i) => (
                <option key={i} value={category}>
                  {category}
                </option>
              ))}
              <option value="직접 입력">직접 입력</option>
            </select>
            {inputField.category === "직접 입력" && (
              <input
                type="text"
                name="customCategory"
                value={inputField.customCategory}
                onChange={(event) => handleInputChange(index, event)}
                placeholder="카테고리를 입력하세요"
                className={style.customCategoryInput}
              />
            )}
          </div>
          <div className={style.formGroup}>
            <label htmlFor={`name-${index}`}>제품 명</label>
            <input
              type="text"
              id={`name-${index}`}
              name="name"
              value={inputField.name}
              onChange={(event) => handleInputChange(index, event)}
            />
          </div>
          <div className={`${style.formGroup} ${style.inlineGroup}`}>
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
          </div>

          <div className={style.formGroup}>
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
                  className={style.formGroup.img}
                />
              </div>
            )}
          </div>
          <div className={style.formGroup}>
            <label htmlFor={`detail-${index}`}>제품 설명</label>
            <textarea
              id={`detail-${index}`}
              name="detail"
              value={inputField.detail}
              onChange={(event) => handleInputChange(index, event)}
              className={style.detailTextarea}
            ></textarea>
          </div>
        </div>
      ))}
      <div>
        <button onClick={onRegisterClickHandler}>등록</button>
        <button onClick={onCancelClickHandler}>취소</button>
      </div>
    </div>
  );
}
