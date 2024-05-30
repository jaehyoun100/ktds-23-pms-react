// 김소현
import React, { useRef, useState } from "react";
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
  const originNumRef = useRef();
  const [number, setNumber] = useState(numRef ? parseInt(numRef.current) : 0);

  const handleMinus = () => {
    setNumber((number) => --number);
    numRef
      ? (numRef.current = parseInt(numRef.current) - 1)
      : (originNumRef.current = parseInt(originNumRef.current) - 1);
  };
  const handlePlus = () => {
    setNumber((number) => ++number);
    numRef
      ? (numRef.current = parseInt(numRef.current) + 1)
      : (originNumRef.current = parseInt(originNumRef.current) + 1);
  };

  const onChangeHandler = () => {
    setNumber(
      numRef ? parseInt(numRef.current) : parseInt(originNumRef.current)
    );
  };

  return (
    <div className="input-group">
      <label htmlFor={inputId} />
      <button className="plusminus" onClick={handleMinus}>
        -
      </button>
      <input
        type="number"
        id={inputId}
        numref={numRef ? numRef : originNumRef}
        min={min}
        max={max}
        readOnly={readOnly}
        onChange={() => {
          onChange && onChange();
          onChangeHandler();
        }}
        value={number}
      />
      <button className="plusminus" onClick={handlePlus}>
        +
      </button>
    </div>
  );
}
