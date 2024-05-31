// 김소현
import "./input.css";

// 수정 못하게 하려면 isReadOnly={true} 전달하기
export default function Textarea({
  inputId,
  textRef,
  value,
  isReadOnly,
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
        readOnly={isReadOnly}
        onChange={onChangeHandler}
      >
        {children}
      </textarea>
    </>
  );
}
