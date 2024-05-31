// 김소현
import React from "react";
import "./checkbox.css";

// 필요한경우 disabled={true}, checked={true}로 props 보내서 사용
export default function Checkbox({
  disabled,
  checked,
  CheckboxId,
  onChangeHandler,
  ref,
  onClickHandler,
}) {
  return (
    <label htmlFor={CheckboxId} className="checkboxlabel">
      <input
        type="checkbox"
        id={CheckboxId}
        disabled={disabled}
        checked={checked}
        onChange={onChangeHandler}
        ref={ref}
        className="checkbox"
        onClick={onClickHandler}
        value={ref.current.value}
      />
      <p className="checkboxP"></p>
    </label>
  );
}
