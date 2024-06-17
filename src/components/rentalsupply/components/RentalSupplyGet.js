import { useCallback, useEffect, useMemo, useState } from "react";
import {
  loadRentalSupplyCategory,
  loadRentalSupplyList,
  loadRentalSupply,
  applyForMultipleRentalSupplies,
} from "../../../http/rentalSupplyHttp";
import style from "../rentalSupply.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function RentalSupplyGet() {
  const [categoryList, setCategoryList] = useState([]);
  const [rentalSupplyList, setRentalSupplyList] = useState([]);
  const [inputFields, setInputFields] = useState([
    {
      selectedCategory: "",
      selectedRentalSupply: "",
      quantity: "",
      remainingStock: null,
    },
  ]);
  const { token } = useSelector((state) => state.tokenInfo);
  const navigate = useNavigate();

  const memoizedLoadRentalSupplyCategory = useCallback(
    loadRentalSupplyCategory,
    []
  );
  const memoizedLoadRentalSupplyList = useCallback(loadRentalSupplyList, []);
  const memoizedLoadRentalSupply = useCallback(loadRentalSupply, []);
  const memoizedToken = useMemo(() => {
    return { token };
  }, [token]);

  useEffect(() => {
    const fetchingData = async () => {
      const json = await memoizedLoadRentalSupplyCategory({ ...memoizedToken });
      const categories = json.rentalSupplyList.map((item) => item.rsplCtgr);
      setCategoryList(categories);
    };

    fetchingData();
  }, [memoizedLoadRentalSupplyCategory, memoizedToken]);

  const handleCategoryChange = (index, event) => {
    const values = [...inputFields];
    values[index].selectedCategory = event.target.value;
    values[index].selectedRentalSupply = "";
    values[index].remainingStock = null;
    setInputFields(values);

    if (event.target.value) {
      const fetchingData = async () => {
        const json = await memoizedLoadRentalSupplyList({ ...memoizedToken });
        const filteredSupplies = json.body.filter(
          (item) => item.rsplCtgr === event.target.value
        );
        setRentalSupplyList(filteredSupplies);
      };

      fetchingData();
    }
  };

  const handleRentalSupplyChange = async (index, event) => {
    const rentalSupplyId = event.target.value;
    const values = [...inputFields];
    const isDuplicate = inputFields.some(
      (field, i) => field.selectedRentalSupply === rentalSupplyId && i !== index
    );

    if (isDuplicate) {
      alert("이미 선택된 대여품입니다. 다른 대여품을 선택해 주세요.");
      return;
    }

    values[index].selectedRentalSupply = rentalSupplyId;
    if (rentalSupplyId) {
      const json = await memoizedLoadRentalSupply({
        selectedRsplId: rentalSupplyId,
        token,
      });
      values[index].remainingStock = json.body.invQty;
    } else {
      values[index].remainingStock = null;
    }
    setInputFields(values);
  };

  const handleQuantityChange = (index, event) => {
    const value = event.target.value;
    const values = [...inputFields];
    if (value.includes("-")) {
      alert("음수는 입력할 수 없습니다.");
      values[index].quantity = "";
    } else {
      values[index].quantity = value;
    }
    setInputFields(values);
  };

  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      {
        selectedCategory: "",
        selectedRentalSupply: "",
        quantity: "",
        remainingStock: null,
      },
    ]);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const onApplyClickHandler = async () => {
    for (const field of inputFields) {
      const { selectedRentalSupply, quantity } = field;
      if (!selectedRentalSupply || !quantity || quantity <= 0) {
        alert("모든 필드를 올바르게 입력해 주세요.");
        return;
      }
    }

    const supplies = inputFields.map((field) => ({
      rsplId: field.selectedRentalSupply,
      rsplRqstQty: field.quantity,
    }));

    const json = await applyForMultipleRentalSupplies(token, supplies);

    if (json.errors) {
      json.errors.forEach((error) => {
        alert(error);
      });
    } else if (json.body) {
      navigate(-1);
    }
  };

  const onCancelClickHandler = () => {
    navigate(-1);
  };

  return (
    <div className={style.rentalSupplyGetContainer}>
      <div className={style.rentalSupplyGetHeader}>
        <h3>대여품 신청</h3>
      </div>
      {inputFields.map((inputField, index) => (
        <div key={index} className={style.rentalForm}>
          <div className={style.formGroup}>
            <label htmlFor={`category-${index}`}>카테고리</label>
            <select
              id={`category-${index}`}
              value={inputField.selectedCategory}
              onChange={(event) => handleCategoryChange(index, event)}
            >
              <option value="">카테고리를 선택하세요</option>
              {categoryList.map((category, i) => (
                <option key={i} value={category}>
                  {category}
                </option>
              ))}
              <option value="직접 입력">직접 입력</option>
            </select>
            {inputField.selectedCategory === "직접 입력" && (
              <input
                type="text"
                value={inputField.selectedCategory}
                onChange={(event) => handleCategoryChange(index, event, true)}
                placeholder="카테고리를 입력하세요"
                className={style.customCategoryInput}
              />
            )}
          </div>
          {inputField.selectedCategory &&
            inputField.selectedCategory !== "직접 입력" && (
              <div className={style.formGroup}>
                <label htmlFor={`rentalSupply-${index}`}>대여품 이름</label>
                <select
                  id={`rentalSupply-${index}`}
                  value={inputField.selectedRentalSupply}
                  onChange={(event) => handleRentalSupplyChange(index, event)}
                >
                  <option value="">대여품을 선택하세요</option>
                  {rentalSupplyList.map((supply) => (
                    <option key={supply.rsplId} value={supply.rsplId}>
                      {supply.rsplName}
                    </option>
                  ))}
                  <option value="직접 입력">직접 입력</option>
                </select>
                {inputField.selectedRentalSupply === "직접 입력" && (
                  <input
                    type="text"
                    value={inputField.selectedRentalSupply}
                    onChange={(event) =>
                      handleRentalSupplyChange(index, event, true)
                    }
                    placeholder="대여품 이름을 입력하세요"
                    className={style.customCategoryInput}
                  />
                )}
              </div>
            )}
          {inputField.remainingStock !== null && (
            <div className={style.formGroup}>
              <label>남은 재고: {inputField.remainingStock}개</label>
            </div>
          )}
          <div className={style.formGroup}>
            <label htmlFor={`quantity-${index}`}>신청 갯수</label>
            <input
              type="number"
              id={`quantity-${index}`}
              value={inputField.quantity}
              onChange={(event) => handleQuantityChange(index, event)}
            />
          </div>
          <div className={style.formGroup}>
            {inputFields.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveFields(index)}
                className={style.removeButton}
              >
                제거
              </button>
            )}
          </div>
        </div>
      ))}
      <div>
        <button
          type="button"
          onClick={handleAddFields}
          className={style.addButton}
        >
          + 대여품 추가
        </button>
        <button onClick={onApplyClickHandler}>신청</button>
        <button onClick={onCancelClickHandler}>취소</button>
      </div>
    </div>
  );
}
