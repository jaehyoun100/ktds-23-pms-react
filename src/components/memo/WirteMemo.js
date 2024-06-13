import { useEffect, useRef, useState } from "react";
import Button from "../common/Button/Button";
import style from "./Memo.module.css";
import { useSelector } from "react-redux";
import { sendMemo } from "../../http/memoHttp";
import { useNavigate } from "react-router-dom";
import SearchEmpMemo from "./searchmodal/SearchEmpMemo";
import MemoModal from "./searchmodal/MemoModal";

export default function WriteMemo() {
  const navigate = useNavigate();
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

  // 쪽지 보내기
  const onWriteMemoClickHandler = async () => {
    if (rcvList.length < 1) {
      alert("수신인을 입력해주세요");
      return;
    }

    // 데이터 생성
    // const sendId = "0112003";
    const memoTtl = memoTtlRef.current.value;
    const memoCntnt = memoCntntRef.current.value;
    const file = fileRef.current.files[0];

    const json = await sendMemo(
      token,
      // sendId,
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

  return (
    <div className={style.memoContainer}>
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
            <Button>취소</Button>
          </div>
          <div className={style.memoContenArea}>
            <div className={style.memoWrite}>
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
                        <input
                          type="text"
                          id="rcvList"
                          className={`${style.writeUserInfoInput} ${style.wirteInput}`}
                          defaultValue={rcvList.map(
                            (emp) => `${emp.empName} (${emp.email})`
                          )}
                        />
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
                      <input
                        type="text"
                        id="rcvMemoId"
                        className={`${style.writeUserInfoInput} ${style.wirteInput}`}
                        defaultValue={rcvRefList.map(
                          (emp) => `${emp.empName} (${emp.email})`
                        )}
                      ></input>
                    </div>
                  </div>
                </div>

                <div className={style.memoWriteOptionItem}>
                  <div className={style.memoWriteOptionItemInner}>
                    <div className={style.writeTitleArea}>
                      <label htmlFor="rcvMemoId">숨은참조</label>
                    </div>
                    <div className={style.writeOptionArea}>
                      <input
                        type="text"
                        style={{ disabled: true }}
                        className={`${style.writeUserInfoInput} ${style.wirteInput}`}
                        defaultValue={rcvSecretRefList.map(
                          (emp) => `${emp.empName} (${emp.email})`
                        )}
                      />
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
                        className={`${style.writeUserInfoInput} ${style.wirteInput}`}
                        ref={fileRef}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className={style.memoWriteEditor}>
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
            <div>
              <Button onClickHandler={onClose}>취소</Button>
              <Button onClickHandler={onSelectRcvHandler}>확인</Button>
            </div>
          }
        />
      )}
    </div>
  );
}
