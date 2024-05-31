// 김소현
import React from "react";
import "./input.css";

// 수정 못하게 하려면 isReadOnly={true} 전달하기
export default function TextInput({
  inputId,
  textRef,
  value,
  isReadOnly,
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
        readOnly={isReadOnly}
        onChange={onChangeHandler}
      />
    </>
  );
}
