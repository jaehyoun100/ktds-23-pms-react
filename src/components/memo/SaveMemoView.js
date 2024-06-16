import { useEffect, useState } from "react";
import Button from "../common/Button/Button";
import style from "./Memo.module.css";
import {
  BsStar,
  BsStarFill,
  BsChevronLeft,
  BsChevronUp,
  BsChevronDown,
  BsDownload,
  BsFileEarmarkTextFill,
} from "react-icons/bs";
import ReceiveMemoViewDetail from "./ReceiveMemoViewDetail";
import SendMemoViewDetail from "./SendMemoViewDetail";

export default function SaveMemoView({
  token,
  myInfo,
  count,
  selectMemo,
  setSelectMemo,
  setNeedLoad,
}) {
  const [selectRcvMemoId, setSelectRcvMemoId] = useState();
  const [selectSendMemoId, setSelectSendMemoId] = useState();

  useEffect(() => {
    console.log("saveMemoView", selectMemo);
    setSelectRcvMemoId(selectMemo.rcvMemoId);
    setSelectSendMemoId(selectMemo.sendMemoId);
  }, [selectMemo]);

  const isRcvMemo = selectMemo.rcvMemoId ? "receive" : "send";

  const onBoardListClickHandler = () => {
    setSelectMemo(undefined);
    setNeedLoad(Math.random());
  };

  return (
    <div className={style.bodyContainer}>
      <div className={style.memoContainer}>
        <>
          <div className={style.memoHeader}>
            <div className={style.titleArea}>
              <h2
                className={style.memoboxTitle}
                onClick={onBoardListClickHandler}
                style={{ cursor: "pointer" }}
              >
                <span className={style.memoboxText}>
                  <BsChevronLeft />
                </span>
                <span className={style.memoboxText}>쪽지보관함</span>
                <span className={style.memoboxText}>{count}</span>
              </h2>
            </div>
          </div>
          {isRcvMemo === "receive" ? (
            <ReceiveMemoViewDetail
              token={token}
              myInfo={myInfo}
              selectRcvMemoId={selectRcvMemoId}
              setSelectRcvMemoId={setSelectMemo}
              setNeedLoad={setNeedLoad}
            />
          ) : (
            <SendMemoViewDetail
              token={token}
              selectSendMemoId={selectSendMemoId}
              setSelectSendMemoId={setSelectSendMemoId}
              setNeedLoad={setNeedLoad}
            />
          )}
        </>
      </div>
    </div>
  );
}
