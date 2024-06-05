// 김소현
import { forwardRef } from "react";
import s from "./input.module.css";

// 수정 못하게 하려면 isReadOnly={true} 전달하기
const Textarea = forwardRef(
  ({ inputId, value, isReadOnly, onChangeHandler, children }, ref) => {
    return (
      <>
        <label htmlFor={inputId} />
        <textarea
          type="text"
          id={inputId}
          ref={ref}
          value={value}
          readOnly={isReadOnly}
          onChange={onChangeHandler}
        >
          {children}
        </textarea>
      </>
    );
  }
);
export default Textarea;
