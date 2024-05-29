// 김소현
import React from "react";

/**
 * optionList = [
 *      {
 *          name:"옵션아이템명",
 *          value:"옵션value값"
 *      }
 * ]
 */
export default function Selectbox({ optionList }) {
  return (
    <select>
      {optionList.map((item, idx) => (
        <option key={idx} value={item.value}>
          {item.name}
        </option>
      ))}
    </select>
  );
}
