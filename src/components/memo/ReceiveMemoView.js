import { useCallback, useMemo, useState } from "react";
import Button from "../common/Button/Button";
import "./Memo.module.css";
import { BsStar, BsStarFill } from "react-icons/bs";
import {
  deleteReceiveMemo,
  loadReceiveMemo,
  saveReceiveMemo,
} from "../../http/memoHttp";
import { useFetch } from "../hook/useFetch";

export default function ReceiveMemoView({
  token,
  selectRcvMemoId,
  setSelectRcvMemoId,
  setNeedLoad,
}) {
  // const [data, setData] = useState();
  // const [isLoading, setIsLoading] = useState(true);
  const [needViewReload, setNeedViewReload] = useState();

  const fetchLoadReceiveMemo = useCallback(loadReceiveMemo, []);
  const fetchParam = useMemo(() => {
    return { selectRcvMemoId, token, needViewReload };
  }, [selectRcvMemoId, token, needViewReload]);

  const { data, isLoading } = useFetch(
    undefined,
    fetchLoadReceiveMemo,
    fetchParam
  );

  // 쪽지 상세정보 조회
  // useEffect(() => {
  //   const loadReceiveMemo = async () => {
  //     const response = await fetch(
  //       `http://localhost:8080/api/memo/receive/${selectRcvMemoId}`,
  //       { method: "GET", headers: { Authorization: token } }
  //     );
  //     const json = await response.json();
  //     setData(json);
  //     setIsLoading(false);
  //     console.log(json);
  //   };
  //   loadReceiveMemo();
  // }, [token, selectRcvMemoId]);

  const { body: receiveMemo } = data || {};
  const [isSave, setIsSave] = useState(false);

  // useEffect(() => {
  //   if (!isLoading && receiveMemo !== null) {
  //     setIsSave(receiveMemo.rcvSaveYn);
  //   }
  // }, [isLoading, receiveMemo, needViewReload]);

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
  // const onClickSaveReceiveMenoHandler = async () => {
  //   const newSaveState = isSave === "N" ? "Y" : "N";

  //   const response = await fetch(
  //     `http://localhost:8080/api/memo/receive/save/${selectRcvMemoId}`,
  //     {
  //       method: "PUT",
  //       headers: { Authorization: token, "Content-Type": "application/json" },
  //       body: JSON.stringify({ rcvSaveYn: newSaveState }),
  //     }
  //   );
  //   const json = await response.json();
  //   const body = json.body;
  //   setIsSave(body.rcvSaveYn);
  //   setNeedViewReload(Math.random());
  // };

  // 목록 조회
  const onBoardListClickHandler = () => {
    setSelectRcvMemoId(undefined);
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

  return (
    <div>
      {isLoading && <div>쪽지 내용을 불러오는 중입니다.</div>}
      {receiveMemo && (
        <div className="memo-container">
          <div className="button-area">
            <Button onClickHandler={onBoardListClickHandler}>목록</Button>
            <Button onClickHandler={onDeleteClickHandler}>삭제</Button>
          </div>
          <div>
            {receiveMemo && (
              <div className="grid" key={selectRcvMemoId}>
                {receiveMemo.rcvSaveYn && (
                  <div id="grid-save" onClick={onClickSaveReceiveMenoHandler}>
                    {receiveMemo.rcvSaveYn === "Y" ? (
                      <BsStarFill />
                    ) : (
                      <BsStar />
                    )}
                  </div>
                )}
                <h4 id="grid-title">{receiveMemo.sendMemoVO.memoTtl}</h4>
                <>
                  <lable id="grid-label-send" htmlFor="sendEmp">
                    보낸사람
                  </lable>
                  <div className="sendEmp" id="grid-send">
                    {receiveMemo.sendMemoVO.departmentVO.deptName}
                    {"부 "}
                    {receiveMemo.sendMemoVO.employeeVO.empName}(
                    {receiveMemo.sendMemoVO.employeeVO.email})
                  </div>
                </>
                <>
                  <lable id="grid-label-receive" htmlFor="ReceiveEmp">
                    받는사람
                  </lable>
                  <div className="ReceiveEmp" id="grid-receive">
                    {receiveMemo.departmentVO.deptName}
                    {"부 "}
                    {receiveMemo.employeeVO.empName} (
                    {receiveMemo.employeeVO.email})
                  </div>
                </>
                {receiveMemo.sendMemoVO.originFileName && (
                  <>
                    <lable id="grid-label-file" htmlFor="sendEmp">
                      첨부파일
                    </lable>
                    <div className="sendEmp" id="grid-file">
                      {receiveMemo.sendMemoVO.originFileName}
                    </div>
                  </>
                )}
                <div id="grid-send-date">{receiveMemo.sendMemoVO.sendDate}</div>
                <div />
                <div id="grid-content">{receiveMemo.sendMemoVO.memoCntnt}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
