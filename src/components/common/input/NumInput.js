// 김소현
import React, { useState } from "react";
import s from "./input.module.css";

// 수정 못하게 하려면 isReadOnly={true} 전달하기
// 최소값이나 최대값 설정하고 싶으면 minNum, maxNum 전달하기
export default function NumInput({
  inputId,
  numRef,
  minNum,
  maxNum,
  isReadOnly,
  onChangeHandler,
}) {
  const [number, setNumber] = useState(numRef ? numRef.current : 0);

  const handleMinus = () => {
    setNumber((number) => {
      const newNumber = number - 1;
      if (numRef) numRef.current = newNumber;
      return newNumber;
    });
  };

  const handlePlus = () => {
    setNumber((number) => {
      const newNumber = number + 1;
      if (numRef) numRef.current = newNumber;
      return newNumber;
    });
  };

  const handleChange = (e) => {
    const newValue = Number(e.target.value);
    setNumber(newValue);
    if (numRef) numRef.current = newValue;
    if (onChangeHandler) onChangeHandler(e);
  };

  return (
    <>
      <label htmlFor={inputId} />
      <button className={s.plusminus} onClick={handleMinus}>
        -
      </button>
      <input
        type="number"
        id={inputId}
        numref={numRef}
        min={minNum}
        max={maxNum}
        readOnly={isReadOnly}
        onChange={handleChange}
        value={number}
      />
      <button className={s.plusminus} onClick={handlePlus}>
        +
      </button>
    </>
  );
}
