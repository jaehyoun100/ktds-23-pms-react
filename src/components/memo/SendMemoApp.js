import { useCallback, useEffect, useMemo, useState } from "react";
import { loadSendMemos } from "../../http/memoHttp";
import { useFetch } from "../hook/useFetch";
import { BsEnvelope, BsStar } from "react-icons/bs";
import Table from "../../utils/Table";
import SendMemoView from "./SendMemoView";
import style from "./Memo.module.css";

let pageNo = 0;

export default function SendMemoApp() {
  const token = localStorage.getItem("token");

  const [needLoad, setNeedLoad] = useState();
  const [selectSendMemoId, setSelectSendMemoId] = useState();

  const isSelect = selectSendMemoId !== undefined;

  const fetchLoadSendMemos = useCallback(loadSendMemos, []);
  const fetchParam = useMemo(() => {
    return { token, needLoad };
  }, [token, needLoad]);

  const { data, setData } = useFetch(undefined, fetchLoadSendMemos, fetchParam);
  const { count, pages, next } = data || {};
  const { body: sendMemos } = data || {};

  console.log(sendMemos);

  const onRowClickHandler = async (sendMemoId) => {
    setSelectSendMemoId(sendMemoId);
  };

  const columns = [
    {
      title: <BsStar />,
      dataIndex: "sendSaveYn",
      key: "sendSaveYn",
      width: "5%",
    },
    {
      title: <BsEnvelope />,
      dataIndex: "sendDate",
      key: "sendDate",
      width: "5%",
    },
    {
      title: "수신인",
      dataIndex: "",
      key: "",
      width: "5%",
    },
    {
      title: "제목",
      dataIndex: "memoTtl",
      key: "memoTtl",
      render: (sendMemos, row) => (
        <span
          style={{ cursor: "pointer" }}
          onClick={() => onRowClickHandler(row.sendMemoId)}
        >
          {sendMemos}
        </span>
      ),
    },
    {
      title: "발신상태",
      dataIndex: "sendStsCode",
      key: "sendStsCode",
      width: "20%",
    },
    {
      title: "발신일",
      dataIndex: "sendDate",
      key: "sendDate",
      width: "20%",
    },
  ];

  const filterOptions = [
    {
      label: "사원명",
      value: "empId",
    },
    {
      label: "제목",
      value: "memoTtl",
    },
    {
      label: "내용",
      value: "memoCntnt",
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (receiveMemos) => ({
      disabled: receiveMemos.rcvMemoId === "Disabled User",
      rcvMemoId: receiveMemos.rcvMemoId,
    }),
  };

  return (
    <div className={style.memoContainer}>
      {token && !isSelect && (
        <>
          <div className={style.memoHeader}>
            <div className={style.titleArea}>
              <h2 className={style.memoboxTitle}>
                <span className={style.memoboxText}>보낸쪽지함</span>
                <span className={style.memoboxText}>{count}</span>
              </h2>
            </div>
          </div>
          <div className={style.memoListArea}>
            <Table
              rowSelection={{
                type: "checkbox",
                ...rowSelection,
              }}
              columns={columns}
              dataSource={sendMemos}
              rowKey={(dt) => dt.sendMemoId}
              filter
              filterOptions={filterOptions}
            />
          </div>
        </>
      )}
      {token && isSelect && (
        <SendMemoView
          token={token}
          selectSendMemoId={selectSendMemoId}
          setSelectSendMemoId={setSelectSendMemoId}
          setNeedLoad={setNeedLoad}
        />
      )}
    </div>
  );
}
