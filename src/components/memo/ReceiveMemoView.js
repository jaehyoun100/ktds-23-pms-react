import { useEffect, useRef, useState } from "react";
import Button from "../common/Button/Button";
import "./Memo.css";
import { BsStar, BsStarFill } from "react-icons/bs";

export default function ReceiveMemoView({
  token,
  selectRcvMemoId,
  setSelectRcvMemoId,
  setNeedLoad,
}) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [needViewReload, setNeedViewReload] = useState();

  useEffect(() => {
    const loadReceiveMemo = async () => {
      const response = await fetch(
        `http://localhost:8080/api/memo/receive/${selectRcvMemoId}`,
        { method: "GET", headers: { Authorization: token } }
      );
      const json = await response.json();
      setData(json);
      setIsLoading(false);
      console.log(json);
    };
    loadReceiveMemo();
  }, [token, selectRcvMemoId]);

  const { body: receiveMemo } = data || {};
  const [isSave, setIsSave] = useState(false);

  useEffect(() => {
    if (!isLoading && receiveMemo !== null) {
      setIsSave(receiveMemo.rcvSaveYn);
    }
  }, [isLoading, receiveMemo]);

  const onClickSaveReceiveMenoHandler = async () => {
    console.log("hello");
    // if (receiveMemo.rcvSaveYn === "N") {
    //   setIsSave("Y");
    // } else {
    //   setIsSave("N");
    // }
    // console.log("!!!!!!!!!!!", isSave);
    const newSaveState = isSave === "N" ? "Y" : "N";
    console.log(newSaveState);

    const response = await fetch(
      `http://localhost:8080/api/memo/receive/save/${selectRcvMemoId}`,
      {
        method: "PUT",
        headers: { Authorization: token, "Content-Type": "application/json" },
        body: JSON.stringify({ rcvSaveYn: newSaveState }),
      }
    );
    const json = await response.json();
    const body = json.body;
    console.log(body);
    setIsSave(body.rcvSaveYn);
    console.log(isSave);
  };

  const onBoardListClickHandler = () => {
    setSelectRcvMemoId(undefined);
  };

  const onDeleteClickHandler = () => {};

  return (
    !isLoading && (
      <div className="memo-container">
        <div className="button-area">
          <Button onClick={onBoardListClickHandler}>목록</Button>
          <Button onClick={onDeleteClickHandler}>삭제</Button>
        </div>
        <div>
          {receiveMemo && (
            <div className="grid" key={selectRcvMemoId}>
              {receiveMemo.rcvSaveYn && (
                <div id="grid-save" onClick={onClickSaveReceiveMenoHandler}>
                  {receiveMemo.rcvSaveYn === "Y" ? <BsStarFill /> : <BsStar />}
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
              <div id="grid-content">{receiveMemo.sendMemoVO.memoTtl}</div>
            </div>
          )}
        </div>
      </div>
    )
  );
}
