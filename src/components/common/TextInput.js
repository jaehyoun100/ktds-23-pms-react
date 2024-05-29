// 김소현
import React from "react";

export default function TextInput({ inputId, ref }) {
  return (
    <>
      <label htmlFor={inputId} />
      <input type="text" id={inputId} ref={ref} />
    </>
  );
}
