// 김소현
import React, { useState } from "react";
import "./input.css";

export default function NumInput({
  inputId,
  numRef,
  min,
  max,
  readOnly,
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
        onChange={handleChange}
        value={number}
      />
      <button className="plusminus" onClick={handlePlus}>
        +
      </button>
    </>
  );
}
