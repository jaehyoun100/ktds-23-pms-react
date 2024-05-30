// 김소현
import React, { useState } from "react";
import "./input.css";

// min, max 값 필요할경우 props로 넘기기
export default function NumInput({
  inputId,
  numRef,
  min,
  max,
  readOnly,
  onChange,
}) {
  const [number, setNumber] = useState(numRef ? numRef.current : 0);

  const handleMinus = () => {
    setNumber((number) => --number);
    numRef && (numRef.current = numRef.current - 1);
  };
  const handlePlus = () => {
    setNumber((number) => ++number);
    numRef && (numRef.current = numRef.current + 1);
  };

  return (
    <>
      <label htmlFor={inputId} />
      <button className="plusminus" onClick={handleMinus}>
        -
      </button>
      <input
        type="number"
        id={inputId}
        numref={numRef}
        min={min}
        max={max}
        readOnly={readOnly}
        onChange={onChange}
        value={number}
      />
      <button className="plusminus" onClick={handlePlus}>
        +
      </button>
    </>
  );
}
