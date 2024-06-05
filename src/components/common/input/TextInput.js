// 김소현
import React, { forwardRef } from "react";
import s from "./input.module.css";

// 수정 못하게 하려면 isReadOnly={true} 전달하기
const TextInput = forwardRef(
  ({ inputId, value, isReadOnly, onChangeHandler, label }, ref) => {
    return (
      <>
        <label htmlFor={inputId}>{label}</label>
        <input
          type="text"
          id={inputId}
          ref={ref}
          value={value}
          readOnly={isReadOnly}
          onChange={onChangeHandler}
        />
      </>
    );
  }
);
export default TextInput;
