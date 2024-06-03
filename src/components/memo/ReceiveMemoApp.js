import { useEffect, useRef, useState } from "react";
import Checkbox from "../common/checkbox/Checkbox";
import ReceiveMemoView from "./ReceiveMemoView";

let pageNo = 0;

export default function MemoApp() {
  const token = localStorage.getItem("token");
  const [data, setData] = useState({});
  const [needLoad, setNeedLoad] = useState();
  const [selectRcvMemoId, setSelectRcvMemoId] = useState();

  const isSelect = selectRcvMemoId !== undefined;

  useEffect(() => {
    if (!token) {
      return;
    }
    const loadReceiveMemos = async () => {
      const response = await fetch(
        `http://localhost:8080/api/memo/receive?pageNo=${pageNo}`,
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }
      );
      const json = await response.json();
      setData(json);
    };
    loadReceiveMemos();
  }, [token, needLoad]);

  const { count, pages, next } = data || {};
  const { body: receiveMemos } = data || {};

  const onRowClickHandler = async (rcvMemoId) => {
    setSelectRcvMemoId(rcvMemoId);
  };

  return (
    <div>
      {token && !isSelect && (
        <>
          <div>받은 쪽지함: 총 {count}개</div>
          <table>
            <thead>
              <tr>
                <th>check</th>
                <th>보관</th>
                <th>읽음</th>
                <th>읽음</th>
                <th>제목</th>
                <th>수신일</th>
              </tr>
            </thead>
            <tbody>
              {receiveMemos &&
                receiveMemos.map((receiveMemo) => (
                  <tr
                    key={receiveMemo.rcvMemoId}
                    onClick={() => onRowClickHandler(receiveMemo.rcvMemoId)}
                  >
                    <td>
                      {/* <Checkbox id={receiveMemo.rcvMemoId} ref={checkboxRef} /> */}
                    </td>
                    <td>{receiveMemo.rcvSaveYn}</td>
                    <td>{receiveMemo.rcvDate}</td>
                    <td>{receiveMemo.sendMemoVO.memoTtl}</td>
                    <td>{receiveMemo.sendMemoVO.memoCntnt}</td>
                    <td>{receiveMemo.sendMemoVO.sendDate}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
      {token && isSelect && (
        <ReceiveMemoView
          token={token}
          selectRcvMemoId={selectRcvMemoId}
          setSelectRcvMemoId={setSelectRcvMemoId}
          setNeedLoad={setNeedLoad}
        />
      )}
    </div>
  );
}
