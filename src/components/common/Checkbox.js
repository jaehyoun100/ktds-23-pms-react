import React from "react";

// 필요한경우 disabled, checked={true}로 props 보내서 사용
export default function Checkbox({
  disabled = false,
  checked = false,
  CheckboxId,
  onChange,
  ref,
}) {
  return (
    <>
      <input
        type="checkbox"
        id={CheckboxId}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
        ref={ref}
      />
    </>
  );
}
