// 김소현
import React, { useState } from "react";
import "./selectbox.css";

/**
 * optionList = [
 *      {
 *          name:"옵션아이템명",
 *          value:"옵션value값"
 *      }
 * ]
 */
export default function Selectbox({ optionList }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(optionList[0].name);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (name) => {
    setSelected(name);
    setIsOpen(false);
  };

  return (
    <div className="custom-select-container">
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
              onClick={() => handleOptionClick(item.name)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
