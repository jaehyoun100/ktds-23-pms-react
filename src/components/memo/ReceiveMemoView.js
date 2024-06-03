import { useEffect, useState } from "react";
import Button from "../common/Button/Button";

export default function ReceiveMemoView({
  token,
  selectRcvMemoId,
  setSelectRcvMemoId,
  setNeedLoad,
}) {
  const [data, setData] = useState();
  const [needViewReload, setNeedViewReload] = useState();

  useEffect(() => {
    const loadReceiveMemo = async () => {
      const response = await fetch(
        `http://localhost:8080/api/memo/receive/${selectRcvMemoId}`,
        { method: "GET", headers: { Authorization: token } }
      );
      const json = await response.json();
      setData(json);
      console.log(json);
    };
    loadReceiveMemo();
  }, [token, selectRcvMemoId]);

  const { body: receiveMemo } = data || {};
  console.log(receiveMemo);

  const onBoardListClickHandler = () => {
    console.log(selectRcvMemoId);
    setSelectRcvMemoId(undefined);
    console.log(selectRcvMemoId);
  };

  const onDeleteClickHandler = () => {};

  return (
    <div>
      <div>
        <Button onClick={onBoardListClickHandler}>목록</Button>
        <Button onClick={onDeleteClickHandler}>삭제</Button>
      </div>
      <div>
        {receiveMemo && (
          <div className="grid" key={selectRcvMemoId}>
            <h3>{receiveMemo.sendMemoVO.memoTtl}</h3>

            <lable htmlFor="sendEmp">보낸사람</lable>
            <div className="sendEmp"></div>

            <lable htmlFor="ReceiveEmp">받는사람</lable>
            <div className="ReceiveEmp">
              {receiveMemo.employeeVO.empName} ({receiveMemo.employeeVO.email})
            </div>

            <div>{receiveMemo.sendMemoVO.sendDate}</div>
            <div>{receiveMemo.sendMemoVO.memoTtl}</div>
          </div>
        )}
      </div>
    </div>
  );
}
