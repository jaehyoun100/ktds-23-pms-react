// 김소현
import React, { useState } from "react";
import "./selectbox.css";

/**
 * useState의 초기값은 selectbox에 처음 보여주고 싶은 값. undefined일 경우 옵션 리스트의 첫번째 값 보여줍니다.
 * 예시)
  const [selectedData, setSelectedData] = useState("값을 입력해주세요");
  const list = [
    { name: "옵션아이템명", value: "옵션value값" },
    { name: "옵션아이템명2", value: "옵션value값2" },
  ];
 * 
 * optionList = [
 *      {
 *          name:"옵션아이템명",
 *          value:"옵션value값"
 *      }
 * ]
 */
export default function Selectbox({
  optionList = [{ name: undefined, value: undefined }],
  selectedData,
  setSelectedData,
  styleClassName,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(
    selectedData ? selectedData : optionList[0].name
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (item) => {
    setSelected(item.name);
    setIsOpen(false);
    setSelectedData(item.value);
  };

  return (
    <div className={`custom-select-container ${styleClassName}`}>
      <div className="custom-select-header" onClick={toggleDropdown}>
        {selected}
        <span className="arrow">{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <ul className="custom-select-list">
          {optionList.map((item, idx) => (
            <li
              key={idx}
              className="custom-select-option"
              onClick={() => handleOptionClick(item)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
