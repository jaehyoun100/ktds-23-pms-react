import { useState } from "react";
import "./Memo.module.css";
import SendMemoApp from "./SendMemoApp";
import Button from "../common/Button/Button";
import WriteMemo from "./WirteMemo";

export default function Memo() {
  const [isWriteMode, setIsWriteMode] = useState(false);

  const onWriteMemoClickHandler = () => {
    setIsWriteMode(true);
  };

  return (
    <>
      <Button onClickHandler={onWriteMemoClickHandler}>쪽지 쓰기</Button>
      {!isWriteMode && <SendMemoApp />}
      {/* <ReceiveMemoApp /> */}
      {isWriteMode && <WriteMemo setIsWriteMode={setIsWriteMode} />}
    </>
  );
}
