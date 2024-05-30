// 김소현
import "./input.css";
export default function Textarea({
  inputId,
  ref,
  value,
  readOnly,
  onChange,
  children,
}) {
  return (
    <>
      <label htmlFor={inputId} />
      <textarea
        type="text"
        id={inputId}
        ref={ref}
        value={value}
        readOnly={readOnly}
        onChange={onChange}
      >
        {children}
      </textarea>
    </>
  );
}
