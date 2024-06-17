import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { loadReceiveMemo, sendMemoService } from "../../http/memoHttp";
import { useFetch } from "../hook/useFetch";
import style from "./Memo.module.css";
import MemoModal from "./searchmodal/MemoModal";
import SearchEmpMemo from "./searchmodal/SearchEmpMemo";
import Button from "../common/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { memoAddrAction } from "../../store/toolkit/slice/memoAddrSlice";

export default function ReplyMemo() {
  // navigate에서 넘긴 state 받아오기
  const location = useLocation();
  const { selectRcvMemoId } = location.state || {};

  const navigate = useNavigate();
  const memoDispatch = useDispatch();
  const token = localStorage.getItem("token");

  // 답장할쪽지 상세정보 조회
  const fetchLoadReceiveMemo = useCallback(loadReceiveMemo, []);
  const [needViewReload, setNeedViewReload] = useState();

  const fileRef = useRef();
  const memoTtlRef = useRef();
  const memoCntntRef = useRef();

  // 쓰기쓰기
  const [showAddrModal, setShowAddrModal] = useState(false);
  const [receiveMemoVO, setReceiveMemoVO] = useState([]);
  const { rcvList, rcvRefList, rcvSecretRefList } = useSelector(
    (state) => state.receiverList
  );

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

  // 답장할 발신자 발신 목록에 추가
  useEffect(() => {
    const rcvList =
      sendMemo && sendMemo.employeeVO ? [sendMemo.employeeVO] : [];
    if (rcvList) {
      const timer = setTimeout(() => {
        memoDispatch(memoAddrAction.addRcvList({ rcvList }));
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [sendMemo, memoDispatch]);

  // modal open/close
  const onEmpListClickHandler = () => {
    setShowAddrModal(true);
  };
  const onClose = () => {
    setShowAddrModal(false);
  };
  const onSelectRcvHandler = () => {
    setShowAddrModal(false);
  };
  const onWriteCancel = () => {
    navigate("/memo");
  };

  // 쪽지 보내기
  const onWriteMemoClickHandler = async () => {
    if (rcvList.length < 1) {
      alert("수신인을 입력해주세요");
      return;
    }

    // 데이터 생성
    const memoTtl = memoTtlRef.current.value;
    const memoCntnt = memoCntntRef.current.value;
    const file = fileRef.current.files[0];

    const json = await sendMemoService(
      token,
      memoTtl,
      memoCntnt,
      file,
      receiveMemoVO
    );

    if (json.body) {
      alert("쪽지가 발송되었습니다.");
      navigate("/memo/send");
    } else if (json.errors) {
      alert(json.errors);
    }
  };

  // 서버로 보낼 수신자목록 생성
  useEffect(() => {
    const newData = rcvList.map((emp) => [emp.empId, "1401"]);
    setReceiveMemoVO(newData);
    if (rcvRefList.length > 0) {
      const newData = rcvRefList.map((emp) => [emp.empId, "1402"]);
      setReceiveMemoVO((prev) => [...prev, ...newData]);
    }
    if (rcvSecretRefList.length > 0) {
      const newData = rcvSecretRefList.map((emp) => [emp.empId, "1403"]);
      setReceiveMemoVO((prev) => [...prev, ...newData]);
    }
  }, [rcvList, rcvRefList, rcvSecretRefList]);

  // 선택 취소
  const deleteSelectRcv = (empId) => {
    const updateRcvList = rcvList.filter((emp) => emp.empId !== empId);
    memoDispatch(memoAddrAction.deleteRcvList({ rcvList: updateRcvList }));
  };
  const deleteSelectRefRcv = (empId) => {
    const updateRcvRefList = rcvRefList.filter((emp) => emp.empId !== empId);
    memoDispatch(
      memoAddrAction.deleteRcvRefList({ rcvRefList: updateRcvRefList })
    );
  };
  const deleteSelectSecretRefRcv = (empId) => {
    const updateRcvSecretRefList = rcvSecretRefList.filter(
      (emp) => emp.empId !== empId
    );
    memoDispatch(
      memoAddrAction.deleteRcvSecretRefList({
        rcvSecretRefList: updateRcvSecretRefList,
      })
    );
  };

  return (
    <>
      <div className={style.bodyContainer}>
        <div className={`${style.memoContainer} ${style.flexDirectCol}`}>
          {!showAddrModal && (
            <>
              <div className={style.memoHeader}>
                <div className={style.titleArea}>
                  <h2 className={style.memoboxTitle}>
                    <span>답장하기</span>
                  </h2>
                </div>
              </div>
              <div className={style.memoToolBar}>
                <Button onClickHandler={onWriteMemoClickHandler}>보내기</Button>
                <Button onClickHandler={onWriteCancel}>취소</Button>
              </div>
              <div className={`${style.memoContenArea} ${style.flexValue}`}>
                <div className={`${style.memoWrite} ${style.flexDirectCol}`}>
                  <div className={style.memoWriteOption}>
                    <div className={style.memoWriteOptionItem}>
                      <div className={style.memoWriteOptionItemInner}>
                        <div className={style.writeTitleArea}>
                          <label htmlFor="rcvList">받는사람</label>
                        </div>
                        <div className={style.writeOptionArea}>
                          <div
                            className={`${style.writeUserInfo} ${style.receiverInput}`}
                          >
                            {rcvList &&
                              rcvList.map((emp) => (
                                <input
                                  type="button"
                                  id="rcvList"
                                  readOnly={true}
                                  className={style.buttonUserWrite}
                                  defaultValue={`${emp.empName} (${emp.email})`}
                                  onClick={() => deleteSelectRcv(emp.empId)}
                                />
                              ))}
                          </div>
                          <div className={style.writeButton}>
                            <Button onClickHandler={onEmpListClickHandler}>
                              주소록
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={style.memoWriteOptionItem}>
                      <div className={style.memoWriteOptionItemInner}>
                        <div className={style.writeTitleArea}>
                          <label htmlFor="rcvMemoId">참조</label>
                        </div>
                        <div className={style.writeOptionArea}>
                          <div
                            className={`${style.writeUserInfoInput} ${style.wirteInput}`}
                          >
                            {rcvRefList &&
                              rcvRefList.map((emp) => (
                                <>
                                  <input
                                    type="button"
                                    id="rcvList"
                                    readOnly={true}
                                    className={style.buttonUserWrite}
                                    defaultValue={`${emp.empName} (${emp.email})`}
                                    onClick={() =>
                                      deleteSelectRefRcv(emp.empId)
                                    }
                                  />
                                </>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={style.memoWriteOptionItem}>
                      <div className={style.memoWriteOptionItemInner}>
                        <div className={style.writeTitleArea}>
                          <label htmlFor="rcvMemoId">숨은참조</label>
                        </div>
                        <div className={style.writeOptionArea}>
                          <div
                            className={`${style.writeUserInfoInput} ${style.wirteInput}`}
                          >
                            {rcvSecretRefList &&
                              rcvSecretRefList.map((emp) => (
                                <input
                                  type="button"
                                  id="rcvList"
                                  readOnly={true}
                                  className={style.buttonUserWrite}
                                  defaultValue={`${emp.empName} (${emp.email})`}
                                  onClick={() =>
                                    deleteSelectSecretRefRcv(emp.empId)
                                  }
                                />
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={style.memoWriteOptionItem}>
                      <div className={style.memoWriteOptionItemInner}>
                        <div className={style.writeTitleArea}>
                          <label htmlFor="memoTtl">제목</label>
                        </div>
                        <div className={style.writeOptionArea}>
                          <input
                            type="text"
                            id="memoTtl"
                            className={`${style.writeUserInfoInput} ${style.wirteInput}`}
                            ref={memoTtlRef}
                          />
                        </div>
                      </div>
                    </div>

                    <div className={style.memoWriteOptionItem}>
                      <div className={style.memoWriteOptionItemInner}>
                        <div className={style.writeTitleArea}>
                          <label htmlFor="originFileName">첨부파일</label>
                        </div>
                        <div className={style.writeOptionBoxArea}>
                          <input
                            type="file"
                            id="originFileName"
                            className={`${style.writeUserInfoInput} ${style.wirteInput} ${style.customFile}`}
                            ref={fileRef}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`${style.memoWriteEditor} ${style.flexValue}`}
                  >
                    <div className={style.memoWriteEditorInner}>
                      <textarea
                        id="memoCntnt"
                        className={`${style.writeMemoTextArea}`}
                        ref={memoCntntRef}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          {showAddrModal && (
            <MemoModal
              id={"memo-addr-modal"}
              header={<>메일 주소록</>}
              onClose={onClose}
              body={<SearchEmpMemo />}
              footer={
                <div className={style.footerBtn}>
                  <Button onClickHandler={onClose}>취소</Button>
                  <Button onClickHandler={onSelectRcvHandler}>수신 등록</Button>
                </div>
              }
            />
          )}
        </div>
      </div>
    </>
  );
}
