// 김소현
import React, { useState } from "react";
import styles from "./selectbox.module.css";

/**
 * useState의 초기값은 selectbox에 처음 보여주고 싶은 값. undefined일 경우 옵션 리스트의 첫번째 값 보여줍니다.
 * 예시)
  const [selectedData, setSelectedData] = useState("값을 입력해주세요");
  const optionList = [
    { label: "옵션아이템명", value: "옵션value값" },
    { label: "옵션아이템명2", value: "옵션value값2" },
  ];
 * 

 */
export default function Selectbox({
  optionList = [{ label: undefined, value: undefined }],
  selectedData,
  setSelectedData,
  style,
  onChangeFn,
  selectRef,
  idx,
  onChangeHandler,
  initial,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(
    initial ? initial : selectedData ? selectedData : optionList[0].label
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = async (item) => {
    console.log(item.value);
    if (idx) {
      setSelected(item.label);
      console.log(selectedData, "origin");
      const newArray = Array.isArray(selectedData)
        ? [...selectedData]
        : [...[selectedData]];
      console.log(newArray, "new");
      newArray[idx] = item.value;
      setSelectedData(newArray);
      setIsOpen(false);
    } else {
      console.log("spdpsps");
      setSelected(item.label);
      setIsOpen(false);
      setSelectedData && (await setSelectedData(item.value));
      selectRef && (selectRef.current = item.value);
      onChangeFn && (await onChangeFn());
    }
  };

  return (
    <div className={styles.customSelectContainer} style={style}>
      <div
        className={styles.customSelectHeader}
        onClick={toggleDropdown}
        onChange={onChangeHandler}
      >
        {selected}
        <span className={styles.arrow}>{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <ul className={styles.customSelectList}>
          {optionList.map((item, idx) => (
            <li
              key={idx}
              className={styles.customSelectOption}
              onClick={() => handleOptionClick(item)}
              value={item.value}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
