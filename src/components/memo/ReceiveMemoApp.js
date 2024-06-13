import { useCallback, useMemo, useState } from "react";
import ReceiveMemoView from "./ReceiveMemoView";
import {
  BsEnvelope,
  BsEnvelopeOpen,
  BsStar,
  BsFillStarFill,
} from "react-icons/bs";
import Table from "../../utils/Table";
import { loadReceiveMemos } from "../../http/memoHttp";
import { useFetch } from "../hook/useFetch";
import style from "./Memo.module.css";

let pageNo = 0;

export default function ReceiveMemoApp() {
  const token = localStorage.getItem("token");
  const [needLoad, setNeedLoad] = useState();
  const [selectRcvMemoId, setSelectRcvMemoId] = useState();

  const isSelect = selectRcvMemoId !== undefined;

  // 수신 쪽지 목록
  const fetchLoadReceiveMemos = useCallback(loadReceiveMemos, []);
  const fetchParam = useMemo(() => {
    return { token, needLoad };
  }, [token, needLoad]);

  const { data, setData } = useFetch(
    undefined,
    fetchLoadReceiveMemos,
    fetchParam
  );

  const { count, pages, next } = data || {};
  const { body: receiveMemos } = data || {};

  const onRowClickHandler = async (rcvMemoId) => {
    setSelectRcvMemoId(rcvMemoId);
  };

  const columns = [
    // {
    //   title: "rcvMemoId",
    //   dataIndex: "rcvMemoId",
    //   key: "rcvMemoId",
    //   width: "5%",
    // },
    {
      title: <BsStar />,
      dataIndex: "rcvSaveYn",
      key: "rcvSaveYn",
      width: "5%",
      render: (text) => (text === "Y" ? <BsFillStarFill /> : <BsStar />),
    },
    {
      title: <BsEnvelope />,
      dataIndex: "rcvDate",
      key: "rcvDate",
      width: "5%",
      render: (text) => (text !== null ? <BsEnvelopeOpen /> : <BsEnvelope />),
    },
    {
      title: "제목",
      dataIndex: ["sendMemoVO", "memoTtl"],
      key: "memoTtl",
      render: (receiveMemos, row) => (
        <span
          style={{ cursor: "pointer" }}
          onClick={() => onRowClickHandler(row.rcvMemoId)}
        >
          {receiveMemos}
        </span>
      ),
    },
    {
      title: "수신일",
      dataIndex: ["sendMemoVO", "sendDate"],
      key: "sendDate",
      width: "15%",
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
                <span className={style.memoboxText}>받은쪽지함</span>
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
              dataSource={receiveMemos}
              rowKey={(dt) => dt.rcvMemoId}
              filter
              filterOptions={filterOptions}
            />
          </div>
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
