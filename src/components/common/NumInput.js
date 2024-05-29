import React from "react";

// min, max 값 필요할경우 props로 넘기기
export default function NumInput({ inputId, ref, min, max }) {
  return (
    <>
      <label htmlFor={inputId} />
      <input type="number" id={inputId} ref={ref} min={min} max={max} />
    </>
  );
}
