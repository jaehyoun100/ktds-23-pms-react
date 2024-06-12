import React, { useState } from "react";
import styles from "./selectbox.module.css";

export default function Selectbox({
  optionList = [{ label: undefined, value: undefined }],
  selectedData,
  setSelectedData,
  style,
  onChangeFn,
  idx,
  initial,
  onChangeHandler,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(
    initial ? initial : selectedData ? selectedData : optionList[0].label
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (item) => {
    if (idx !== undefined) {
      const newArray = [...selectedData];
      newArray[idx] = item.value;
      setSelected(item.label);
      setSelectedData(newArray);
      setIsOpen(false);
      onChangeFn && onChangeFn(item); // 변경된 값 전달
    } else {
      setSelected(item.label);
      setSelectedData && setSelectedData(item.value);
      setIsOpen(false);
      onChangeFn && onChangeFn();
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
