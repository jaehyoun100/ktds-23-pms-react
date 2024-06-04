// 김소현
import React from "react";
import s from "./checkbox.module.css";

// 필요한경우 isDisabled={true}, isChecked={true}로 props 보내서 사용
export default function Checkbox({
  isDisabled,
  isChecked,
  CheckboxId,
  onChangeHandler,
  checkboxRef,
  onClickHandler,
}) {
  return (
    <label htmlFor={CheckboxId} className={s.checkboxlabel}>
      <input
        type="checkbox"
        id={CheckboxId}
        disabled={isDisabled}
        checked={isChecked}
        onChange={onChangeHandler}
        ref={checkboxRef}
        className={s.checkbox}
        onClick={onClickHandler}
        value={checkboxRef.current.value}
      />
      <p className={s.checkboxP}></p>
    </label>
  );
}
