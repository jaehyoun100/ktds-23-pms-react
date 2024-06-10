import { useRef, useState } from "react";
import Button from "../common/Button/Button";
import MemoModal from "./MemoModal";
import SearchEmpMemo from "./SearchEmpMemo";
import "./Memo.module.css";

export default function WriteMemo({ setIsWriteMode }) {
  const token = localStorage.getItem("token");
  const rcvIdRef = useRef();
  const refRcvIdRef = useRef();
  const refSecRcvIdRef = useRef();
  const memoTtlRef = useRef();
  const fileRef = useRef();
  const memoCntntRef = useRef();
  const [rcvData, setRcvData] = useState([]);
  const [showAddrModal, setShowAddrModal] = useState(false);

  const onEmpListClickHandler = () => {
    setShowAddrModal(true);
  };

  const onClose = () => {
    setShowAddrModal(false);
  };

  const onWriteMemoClickHandler = async () => {
    if (rcvIdRef.current) {
      const rcvId = rcvIdRef.current.value;
      setRcvData((prevData) => [...prevData, [rcvId, "1401"]]);
    }
    console.log(rcvData);
    const memoTtl = memoTtlRef.current.value;
    const file = fileRef.current.files[0];
    const memoCntnt = memoCntntRef.current.value;

    // const json = await writeMemo(token, rcvData, memoTtl, file, memoCntnt);
    // console.log(">>>>", json);
  };

  return (
    <>
      {!showAddrModal && (
        <div className="memo-container">
          <div className="button-area">
            <Button onClickHandler={onWriteMemoClickHandler}>보내기</Button>
            <Button>취소</Button>
          </div>
          <div>
            <div>
              <label htmlFor="rcvMemoId">받는사람</label>
              <input type="text" id="rcvMemoId" ref={rcvIdRef} />
              <Button onClickHandler={onEmpListClickHandler}>주소록</Button>
            </div>
            <div>
              <label htmlFor="rcvMemoId">참조</label>
              <input type="text" id="rcvMemoId" ref={refRcvIdRef} />
            </div>
            <div>
              <label htmlFor="rcvMemoId">숨은참조</label>
              <input type="text" id="rcvMemoId" ref={refSecRcvIdRef} />
            </div>
            <div>
              <label htmlFor="memoTtl">제목</label>
              <input type="text" id="memoTtl" ref={memoTtlRef} />
            </div>
            <div>
              <label htmlFor="originFileName">첨부파일</label>
              <input type="file" id="originFileName" ref={fileRef} />
            </div>
            <div>
              <label htmlFor="memoCntnt">내용</label>
              <textarea id="memoCntnt" ref={memoCntntRef}></textarea>
            </div>
          </div>
        </div>
      )}
      {showAddrModal && (
        <MemoModal
          id={"memo-addr-modal"}
          header={<>메일 주소록</>}
          onClose={onClose}
          body={<SearchEmpMemo />}
          footer={
            <div>
              <Button>취소</Button>
              <Button>확인</Button>
            </div>
          }
        />
      )}
    </>
  );
}
