import { useCallback, useMemo, useState } from "react";
import { useFetch } from "../hook/useFetch";
import {
  deleteReceiveMemo,
  loadReceiveMemo,
  onDownloadFile,
  saveReceiveMemo,
} from "../../http/memoHttp";
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
import MemoReceiverArea from "./MemoReceiverArea";
import ReplyMemo from "./ReplyMemo";
import { useNavigate } from "react-router-dom";

export default function ReceiveMemoViewDetail({
  token,
  myInfo,
  selectRcvMemoId,
  setSelectRcvMemoId,
  setNeedLoad,
}) {
  const navigate = useNavigate();
  const [isFolded, setIsFolded] = useState(false);
  const [isFileFolded, setIsFileFolded] = useState(false);
  const [needViewReload, setNeedViewReload] = useState();
  const [isReplyMode, setIsReplyMode] = useState(false);

  // 쪽지 상세정보 조회
  const fetchLoadReceiveMemo = useCallback(loadReceiveMemo, []);

  console.log("********", selectRcvMemoId);

  const fetchParam = useMemo(() => {
    return { selectRcvMemoId, token, needViewReload };
  }, [selectRcvMemoId, token, needViewReload]);

  const { data, isLoading } = useFetch(
    undefined,
    fetchLoadReceiveMemo,
    fetchParam
  );

  const { rcvJson, sendJson } = data || {};
  const { body: receiveMemo } = rcvJson || {};
  const { body: sendMemo } = sendJson || {};

  // 답변하기
  const onReplyMemoHandler = () => {
    navigate("/memo/reply", { state: { selectRcvMemoId } });
  };

  // 목록 조회
  const onBoardListClickHandler = () => {
    setSelectRcvMemoId(undefined);
    setNeedLoad(Math.random());
  };

  // 쪽지 삭제
  const onDeleteClickHandler = async () => {
    const json = await deleteReceiveMemo(token, selectRcvMemoId);
    if (json.body) {
      setSelectRcvMemoId(undefined);
      setNeedLoad(Math.random());
    } else {
      alert(json.errors);
    }
  };

  // 쪽지 보관
  const onClickSaveReceiveMenoHandler = async () => {
    const newSaveState = receiveMemo.rcvSaveYn === "N" ? "Y" : "N";
    // console.log(newSaveState);
    const json = await saveReceiveMemo(token, selectRcvMemoId, newSaveState);
    if (json.body) {
      setNeedViewReload(Math.random());
    } else if (json.errors) {
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
  const onDownloadFileHandler = async (fileName) => {
    const response = await onDownloadFile(token, selectRcvMemoId);

    if (!response.ok) {
      console.error(
        `File download failed with status code: ${response.status}`
      );
      throw new Error("File download failed");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <>
      {isLoading && <div>데이터를 불러오는 중입니다.</div>}
      {!isLoading && receiveMemo && sendMemo && (
        <>
          {/* button */}
          <div className={style.memoToolBar}>
            <Button onClickHandler={onReplyMemoHandler}>답장</Button>
            <Button onClickHandler={onBoardListClickHandler}>목록</Button>
            <Button onClickHandler={onDeleteClickHandler}>삭제</Button>
          </div>
          {/* header */}
          <div className={style.mailViewWrap}>
            <div className={style.memoViewInner}>
              <div className={style.memoViewHeader}>
                <h4 className={style.memoViewTitle}>
                  <span className={style.toggleSaveWrap}>
                    {receiveMemo.rcvSaveYn && (
                      <div
                        className={style.toggleSave}
                        onClick={onClickSaveReceiveMenoHandler}
                      >
                        {receiveMemo.rcvSaveYn === "Y" ? (
                          <BsStarFill />
                        ) : (
                          <BsStar />
                        )}
                      </div>
                    )}
                  </span>
                  <span className={style.titleText}>
                    {receiveMemo.sendMemoVO.memoTtl}
                  </span>
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
                        {receiveMemo.sendMemoVO.departmentVO.deptName}
                        {"부 "}
                        {receiveMemo.sendMemoVO.employeeVO.empName}(
                        {receiveMemo.sendMemoVO.employeeVO.email})
                      </button>
                    </div>
                  </div>
                  {!isFolded && (
                    <MemoReceiverArea sendMemo={sendMemo} myInfo={myInfo} />
                  )}
                </div>
                <div className={style.memoViewInfoArea}>
                  <span className={style.memoDate}>
                    {receiveMemo.sendMemoVO.sendDate}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* body */}
          <div className={style.memoViewBody}>
            {/* 첨부파일  */}
            {receiveMemo.sendMemoVO.originFileName !== null &&
              receiveMemo.sendMemoVO.originFileName !== "" && (
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
                              {receiveMemo.sendMemoVO.originFileName}
                            </div>
                          </div>
                          <div className={style.task}>
                            <div
                              className={style.buttonSaveFile}
                              onClick={() =>
                                onDownloadFileHandler(
                                  receiveMemo.sendMemoVO.originFileName
                                )
                              }
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
            <div className={style.memoViewContent}>
              {receiveMemo.sendMemoVO.memoCntnt}
            </div>
          </div>
        </>
      )}
    </>
  );
}
