import style from "./Memo.module.css";
import { BsChevronLeft } from "react-icons/bs";
import ReceiveMemoViewDetail from "./ReceiveMemoViewDetail";

export default function ReceiveMemoView({
  token,
  myInfo,
  count,
  selectRcvMemoId,
  setSelectRcvMemoId,
  setNeedLoad,
}) {
  // 수신함 이동
  const onBoardListClickHandler = () => {
    setSelectRcvMemoId(undefined);
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
                <span className={style.memoboxText}>받은쪽지함</span>
                <span className={style.memoboxText}>{count}</span>
              </h2>
            </div>
          </div>
          <ReceiveMemoViewDetail
            token={token}
            myInfo={myInfo}
            selectRcvMemoId={selectRcvMemoId}
            setSelectRcvMemoId={setSelectRcvMemoId}
            setNeedLoad={setNeedLoad}
          />
        </>
      </div>
    </div>
  );
}
