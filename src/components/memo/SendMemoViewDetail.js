import { useCallback, useMemo, useState } from "react";
import { useFetch } from "../hook/useFetch";
import Button from "../common/Button/Button";
import style from "./Memo.module.css";
import {
  BsStar,
  BsStarFill,
  BsChevronUp,
  BsChevronDown,
  BsDownload,
  BsFileEarmarkTextFill,
} from "react-icons/bs";
import {
  cancelSendMemo,
  deleteSendMemo,
  loadSendMemo,
  saveSendMemo,
} from "../../http/memoHttp";
import MemoReceiverArea from "./MemoReceiverArea";

export default function SendMemoViewDetail({
  token,
  selectSendMemoId,
  setSelectSendMemoId,
  setNeedLoad,
}) {
  const [isFolded, setIsFolded] = useState(false);
  const [isFileFolded, setIsFileFolded] = useState(false);
  const [needViewReLoad, setNeedViewReLoad] = useState();

  const fetchLoadSendMemo = useCallback(loadSendMemo, []);
  const fetchParam = useMemo(() => {
    return { selectSendMemoId, token, needViewReLoad };
  }, [selectSendMemoId, token, needViewReLoad]);

  const { data, isLoading } = useFetch(
    undefined,
    fetchLoadSendMemo,
    fetchParam
  );

  const { body: sendMemo } = data || {};

  // 발신함 이동
  const onBoardListClickHandler = () => {
    setSelectSendMemoId(undefined);
    setNeedLoad(Math.random());
  };

  // 쪽지 보관
  const onClickSaveSendMenoHandler = async () => {
    const newSaveState = sendMemo.sendSaveYn === "N" ? "Y" : "N";

    const json = await saveSendMemo(token, selectSendMemoId, newSaveState);
    if (json.body) {
      setNeedViewReLoad(Math.random());
    } else if (json.errors) {
      alert(json.erros);
    }
  };

  // 쪽지 삭제
  const onDeleteClickHandler = async () => {
    const json = await deleteSendMemo(token, selectSendMemoId);
    if (json.body) {
      setSelectSendMemoId(undefined);
      setNeedLoad(Math.random);
    } else {
      alert(json.errors);
    }
  };

  // 발신 취소
  const onCancelClickHandler = async () => {
    const json = await cancelSendMemo(token, selectSendMemoId);
    if (json.body) {
      alert("발신이 취소되었습니다");
    } else {
      alert(json.errors);
    }
  };

  // 받는사람 숨김
  const ontoggleSenderHandler = () => {
    setIsFolded(!isFolded);
  };

  // 첨부파일 숨김
  const ontoggleFileHandler = () => {
    setIsFileFolded(!isFileFolded);
  };

  // 첨부파일 다운로드
  const onDownloadFileHandler = async () => {
    // const json = await onDownloadFile(token, selectRcvMemoId);
    // if (json.errors) {
    //   alert(json.errors);
    // }
  };

  return (
    <>
      {isLoading && <div>데이터를 불러오는 중입니다.</div>}
      {!isLoading && sendMemo && (
        <>
          {/* button */}
          <div className={style.memoToolBar}>
            <Button onClickHandler={onBoardListClickHandler}>목록</Button>
            <Button onClickHandler={onDeleteClickHandler}>삭제</Button>
            <Button onClickHandler={onCancelClickHandler}>발신취소</Button>
          </div>
          {/* header */}
          <div className={style.mailViewWrap}>
            <div className={style.memoViewInner}>
              <div className={style.memoViewHeader}>
                <h4 className={style.memoViewTitle}>
                  <span className={style.toggleSaveWrap}>
                    {sendMemo.sendSaveYn && (
                      <div
                        className={style.toggleSave}
                        onClick={onClickSaveSendMenoHandler}
                      >
                        {sendMemo.sendSaveYn === "Y" ? (
                          <BsStarFill />
                        ) : (
                          <BsStar />
                        )}
                      </div>
                    )}
                  </span>
                  <span className={style.titleText}>{sendMemo.memoTtl}</span>
                </h4>
                <div className={style.memoViewOption}>
                  <div
                    className={`${style.toggleViewReceiver} ${
                      isFolded ? "folded" : ""
                    }`}
                    onClick={ontoggleSenderHandler}
                  >
                    {isFolded ? <BsChevronDown /> : <BsChevronUp />}
                  </div>
                  <div className={`${style.memoOptionItem} ${style.sender}`}>
                    <div className={style.memotitleArea}>
                      <strong className={style.optionTitle}>보낸사람</strong>
                    </div>
                    <div className={style.optionArea}>
                      <button className={style.buttonUser}>
                        {sendMemo.departmentVO.deptName}
                        {"부 "}
                        {sendMemo.employeeVO.empName}(
                        {sendMemo.employeeVO.email})
                      </button>
                    </div>
                  </div>
                  {!isFolded && <MemoReceiverArea sendMemo={sendMemo} />}
                </div>
                <div className={style.memoViewInfoArea}>
                  <span className={style.memoDate}>{sendMemo.sendDate}</span>
                </div>
              </div>
            </div>
          </div>
          {/* body */}
          <div className={style.memoViewBody}>
            {/* 첨부파일  */}
            {sendMemo.originFileName !== null &&
              sendMemo.originFileName !== "" && (
                <div
                  className={`${style.fileAttachments} ${
                    !isFileFolded ? "" : style.isBorderBottom
                  }`}
                >
                  <div className={style.fileAttachmentsToolbar}>
                    <div
                      className={style.fileToggleButton}
                      onClick={ontoggleFileHandler}
                    >
                      {isFileFolded ? <BsChevronDown /> : <BsChevronUp />}
                    </div>
                    <span className={style.fileToolbarTitle}>첨부</span>
                  </div>
                  {!isFileFolded && (
                    <div className={style.fileAttachmentsInner}>
                      <ul className={style.fileList}>
                        <li className={style.fileItem}>
                          <div className={style.fileInfo}>
                            <div className={style.fileThumbnail}>
                              <BsFileEarmarkTextFill />
                            </div>
                            <div className={style.fileInfoArea}>
                              {sendMemo.originFileName}
                            </div>
                          </div>
                          <div className={style.task}>
                            <div
                              className={style.buttonSaveFile}
                              onClick={() => onDownloadFileHandler()}
                            >
                              <BsDownload />
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              )}
            {/* 쪽지 내용 */}
            <div className={style.memoViewContent}>{sendMemo.memoCntnt}</div>
          </div>
        </>
      )}
    </>
  );
}
