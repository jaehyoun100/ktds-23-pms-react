// 김소현
import React from "react";
import "./input.css";

export default function TextInput({
  inputId,
  textRef,
  value,
  readOnly,
  onChange,
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
        onChange={onChange}
      />
    </>
  );
}
