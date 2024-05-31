// 김소현
import React from "react";
import "./button.css";

export default function Button({ onClickHandler, children, disabled }) {
  return (
    <button onClick={onClickHandler} disabled={disabled}>
      {children}
    </button>
  );
}
