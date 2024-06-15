import { useCallback, useEffect, useMemo, useState } from "react";
import Button from "../common/Button/Button";
import style from "./Memo.module.css";
import { useFetch } from "../hook/useFetch";
import {
  BsStar,
  BsStarFill,
  BsChevronLeft,
  BsChevronUp,
  BsChevronDown,
  BsDownload,
  BsFileEarmarkTextFill,
} from "react-icons/bs";
import {
  deleteReceiveMemo,
  loadReceiveMemo,
  saveReceiveMemo,
} from "../../http/memoHttp";

export default function ReceiveMemoView({
  token,
  count,
  selectRcvMemoId,
  setSelectRcvMemoId,
  setNeedLoad,
}) {
  const [needViewReload, setNeedViewReload] = useState();
  const [isFolded, setIsFolded] = useState(false);
  const [isFileFolded, setIsFileFolded] = useState(false);

  // 쪽지 상세정보 조회
  const fetchLoadReceiveMemo = useCallback(loadReceiveMemo, []);

  const fetchParam = useMemo(() => {
    return { selectRcvMemoId, token, needViewReload };
  }, [selectRcvMemoId, token, needViewReload]);

  const { data, isLoading } = useFetch(
    undefined,
    fetchLoadReceiveMemo,
    fetchParam
  );
  // console.log("와라와라 >>> ", data);
  const { rcvJson, sendJson } = data || {};
  const { body: receiveMemo } = rcvJson || {};
  const { body: sendMemo } = sendJson || {};
  const receiveMemoVOList = sendMemo ? sendMemo.receiveMemoVOList : [];
  // const receiveMemoVOList = sendMemo.receiveMemoVOList;
  // console.log(receiveMemoVOList);

  const rcvList = receiveMemoVOList.filter((memo) => memo.rcvCode === "1401");
  const rcvRefList = receiveMemoVOList.filter(
    (memo) => memo.rcvCode === "1402"
  );
  const rcvSecretRefList = receiveMemoVOList.filter(
    (memo) => memo.rcvCode === "1403"
  );

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

  // 받는사람 숨김
  const ontoggleSenderHandler = () => {
    setIsFolded(!isFolded);
  };

  const ontoggleFileHandler = () => {
    setIsFileFolded(!isFileFolded);
  };

  return (
    <div className={style.bodyContainer}>
      <div className={style.memoContainer}>
        {isLoading && <div>쪽지 내용을 불러오는 중입니다.</div>}
        {!isLoading && receiveMemo && (
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
            {/* button */}
            <div className={style.memoToolBar}>
              <Button>답장</Button>
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
                    {!isFolded && receiveMemoVOList && (
                      <>
                        {rcvList && (
                          <div className={style.memoOptionItem}>
                            <div className={style.memotitleArea}>
                              <strong className={style.optionTitle}>
                                받는사람
                              </strong>
                            </div>
                            <div className={style.optionArea}>
                              {rcvList.map((receiver) => (
                                <div
                                  className={style.receiverArea}
                                  key={receiver.empId}
                                >
                                  <button className={style.buttonUser}>
                                    {receiver.departmentVO.deptName}{" "}
                                    {receiver.employeeVO.empName} (
                                    {receiver.employeeVO.email})
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {/* TODO 참조가 있을 때만 보여주기 */}
                        {rcvRefList && (
                          <div className={style.memoOptionItem}>
                            <div className={style.memotitleArea}>
                              <strong className={style.optionTitle}>
                                참조
                              </strong>
                            </div>
                            <div className={style.optionArea}>
                              {rcvRefList.map((receiver) => (
                                <div
                                  className={style.receiverArea}
                                  key={receiver.empId}
                                >
                                  <button className={style.buttonUser}>
                                    {receiver.departmentVO.deptName}{" "}
                                    {receiver.employeeVO.empName} (
                                    {receiver.employeeVO.email})
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {/* TODO 수신자가 숨은참조일 때 본인 정보만 나오게 수정 */}
                        {rcvSecretRefList && (
                          <div className={style.memoOptionItem}>
                            <div className={style.memotitleArea}>
                              <strong className={style.optionTitle}>
                                숨은참조
                              </strong>
                            </div>
                            <div className={style.optionArea}>
                              {rcvSecretRefList.map((receiver) => (
                                <div className={style.receiverArea}>
                                  <button className={style.buttonUser}>
                                    {receiver.departmentVO.deptName}{" "}
                                    {receiver.employeeVO.empName} (
                                    {receiver.employeeVO.email})
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
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
                          <div className={style.buttonSaveFile}>
                            <BsDownload />
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <div className={style.memoViewContent}>
                {receiveMemo.sendMemoVO.memoCntnt}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
