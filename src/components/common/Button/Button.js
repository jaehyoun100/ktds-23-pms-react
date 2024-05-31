// 김소현
import React from "react";
import "./button.css";

/**
 * ## props 설명
 * 버튼 클릭 시 실행되는 함수 "onClickHandler" 전달
 * disabled 주고싶을 경우 "isDisabled={true}" 값 전달
 * style 적용 시키고 싶으면 "styleClass" 전달해 className 설정
 */
export default function Button({
  onClickHandler,
  children,
  isDisabled,
  styleClass,
}) {
  return (
    <button
      onClick={onClickHandler}
      disabled={isDisabled}
      className={styleClass}
    >
      {children}
    </button>
  );
}
