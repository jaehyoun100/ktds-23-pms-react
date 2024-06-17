import { useEffect, useRef, useState } from "react";
import Button from "../common/Button/Button";
import style from "./Memo.module.css";
import { useDispatch, useSelector } from "react-redux";
import { sendMemoService } from "../../http/memoHttp";
import { useNavigate } from "react-router-dom";
import SearchEmpMemo from "./searchmodal/SearchEmpMemo";
import MemoModal from "./searchmodal/MemoModal";
import { memoAddrAction } from "../../store/toolkit/slice/memoAddrSlice";

export default function WriteMemo() {
  const navigate = useNavigate();
  const memoDispatch = useDispatch();
  const token = localStorage.getItem("token");

  const fileRef = useRef();
  const memoTtlRef = useRef();
  const memoCntntRef = useRef();

  const [showAddrModal, setShowAddrModal] = useState(false);
  const [receiveMemoVO, setReceiveMemoVO] = useState([]);

  // 수신자 목록
  const { rcvList, rcvRefList, rcvSecretRefList } = useSelector(
    (state) => state.receiverList
  );

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
      memoDispatch(memoAddrAction.deleteRcvList({ rcvList: [] }));
      memoDispatch(memoAddrAction.deleteRcvRefList({ rcvRefList: [] }));
      memoDispatch(
        memoAddrAction.deleteRcvSecretRefList({
          rcvSecretRefList: [],
        })
      );
    } else if (json.errors) {
      alert(json.errors);
    }
  };

  useEffect(() => {
    const newData = rcvList.map((emp) => [emp.empId, "1401"]);
    // emp.empId,
    // "1401",
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
    <div className={style.bodyContainer}>
      <div className={`${style.memoContainer} ${style.flexDirectCol}`}>
        {!showAddrModal && (
          <>
            <div className={style.memoHeader}>
              <div className={style.titleArea}>
                <h2 className={style.memoboxTitle}>
                  <span>쪽지쓰기</span>
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
                                  onClick={() => deleteSelectRefRcv(emp.empId)}
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

                <div className={`${style.memoWriteEditor} ${style.flexValue}`}>
                  <div className={style.memoWriteEditorInner}>
                    {/* <label htmlFor="memoCntnt">내용</label> */}
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
  );
}
