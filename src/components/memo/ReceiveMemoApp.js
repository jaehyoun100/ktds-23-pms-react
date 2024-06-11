import { useCallback, useMemo, useState } from "react";
import ReceiveMemoView from "./ReceiveMemoView";
import { BsEnvelope, BsStar } from "react-icons/bs";
import Table from "../../utils/Table";
import { loadReceiveMemos } from "../../http/memoHttp";
import { useFetch } from "../hook/useFetch";

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

  console.log("receiveMemos >>", receiveMemos);

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
    },
    {
      title: <BsEnvelope />,
      dataIndex: "rcvDate",
      key: "rcvDate",
      width: "5%",
    },
    {
      title: "발신일",
      dataIndex: "rcvDate",
      key: "rcvDate",
      width: "20%",
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
      width: "5%",
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
    <div>
      {token && !isSelect && (
        <>
          <div>받은 쪽지함: 총 {count}</div>

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
