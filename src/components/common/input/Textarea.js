// 김소현
import "./input.css";
export default function Textarea({
  inputId,
  textRef,
  value,
  readOnly,
  onChangeHandler,
  children,
}) {
  return (
    <>
      <label htmlFor={inputId} />
      <textarea
        type="text"
        id={inputId}
        ref={textRef}
        value={value}
        readOnly={readOnly}
        onChange={onChangeHandler}
      >
        {children}
      </textarea>
    </>
  );
}
