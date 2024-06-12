import { useRef, useState } from "react";
import Button from "../common/Button/Button";
import MemoModal from "./MemoModal";
import SearchEmpMemo from "./SearchEmpMemo";
import style from "./Memo.module.css";
import { useSelector } from "react-redux";

export default function WriteMemo({ setIsWriteMode }) {
  const token = localStorage.getItem("token");

  const rcvListRef = useRef();
  const rcvRefListRef = useRef();
  const rcvSecretRefListRef = useRef();
  const memoTtlRef = useRef();
  const fileRef = useRef();
  const memoCntntRef = useRef();

  const [rcvData, setRcvData] = useState([]);
  const [showAddrModal, setShowAddrModal] = useState(false);

  // 수신자 목록 가져오기
  const { rcvList, rcvRefList, rcvSecretRefList } = useSelector(
    (state) => state.receiverList
  );

  const onEmpListClickHandler = () => {
    setShowAddrModal(true);
  };

  const onClose = () => {
    setShowAddrModal(false);
  };

  const onSelectRcvHandler = () => {
    console.log("확인 1 ", rcvList);
    console.log("확인 2 ", rcvRefList);
    console.log("확인 3 ", rcvSecretRefList);
    setShowAddrModal(false);
  };

  const onWriteMemoClickHandler = async () => {
    // if (rcvIdRef.current) {
    //   const rcvId = rcvIdRef.current.value;
    //   setRcvData((prevData) => [...prevData, [rcvId, "1401"]]);
    // }
    // console.log(rcvData);
    // const memoTtl = memoTtlRef.current.value;
    // const file = fileRef.current.files[0];
    // const memoCntnt = memoCntntRef.current.value;
    // const json = await writeMemo(token, rcvData, memoTtl, file, memoCntnt);
    // console.log(">>>>", json);
  };

  return (
    <div className={style.memoContainer}>
      {!showAddrModal && (
        <>
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
                          ref={rcvListRef}
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
                        ref={rcvRefListRef}
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
                        id="rcvMemoId"
                        className={`${style.writeUserInfoInput} ${style.wirteInput}`}
                        ref={rcvSecretRefListRef}
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
                    className={`${style.writeMemoTextArea} ${style.wirteTextArea}`}
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
