// 김소현
import React from "react";
import "./input.css";

/**
 * 
  inputId : 
  textRef,
  value,
  readOnly,
  onChange,
 */
export default function TextInput({
  inputId,
  textRef,
  value,
  readOnly,
  onChangeHandler,
}) {
  return (
    <>
      <label htmlFor={inputId} />
      <input
        type="text"
        id={inputId}
        ref={textRef}
        value={value}
        readOnly={readOnly}
        onChange={onChangeHandler}
      />
    </>
  );
}
