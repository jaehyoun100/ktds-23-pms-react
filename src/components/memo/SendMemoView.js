import style from "./Memo.module.css";
import { BsChevronLeft } from "react-icons/bs";
import SendMemoViewDetail from "./SendMemoViewDetail";

export default function SendMemoView({
  token,
  count,
  selectSendMemoId,
  setSelectSendMemoId,
  setNeedLoad,
}) {
  // 발신함 이동
  const onBoardListClickHandler = () => {
    setSelectSendMemoId(undefined);
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
                <span className={style.memoboxText}>보낸쪽지함</span>
                <span className={style.memoboxText}>{count}</span>
              </h2>
            </div>
          </div>
          <SendMemoViewDetail
            token={token}
            selectSendMemoId={selectSendMemoId}
            setSelectSendMemoId={setSelectSendMemoId}
            setNeedLoad={setNeedLoad}
          />
        </>
      </div>
    </div>
  );
}
