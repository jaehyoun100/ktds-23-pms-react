import { useEffect, useRef, useState } from "react";
import Checkbox from "../common/checkbox/Checkbox";
import ReceiveMemoView from "./ReceiveMemoView";
import { BsEnvelope, BsStar } from "react-icons/bs";
import Table from "../../utils/Table";
import { Radio } from "antd";
import { Navigate } from "react-router-dom";

let pageNo = 0;

export default function ReceiveMemoApp() {
  const token = localStorage.getItem("token");
  const [data, setData] = useState({});
  const [needLoad, setNeedLoad] = useState();
  const [selectRcvMemoId, setSelectRcvMemoId] = useState();
  const [selectionType, setSelectionType] = useState("checkbox");

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

  console.log("receiveMemos >>", receiveMemos);

  const onRowClickHandler = async (rcvMemoId) => {
    console.log(">>>>>>>>>>", rcvMemoId);
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
      // Column configuration not to be checked
      rcvMemoId: receiveMemos.rcvMemoId,
    }),
  };

  return (
    <div>
      {token && !isSelect && (
        <>
          <div>받은 쪽지함: 총 {count}개</div>

          <Table
            rowSelection={{
              type: selectionType,
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
