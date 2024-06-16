import { useCallback, useMemo, useState } from "react";
import ReceiveMemoView from "./ReceiveMemoView";
import {
  BsEnvelope,
  BsEnvelopeFill,
  BsEnvelopeOpen,
  BsStar,
  BsFillStarFill,
} from "react-icons/bs";
import Table from "../../utils/Table";
import { useFetch } from "../hook/useFetch";
import style from "./Memo.module.css";
import {
  loadReceiveMemos,
  readReceiveMemo,
  saveReceiveMemo,
} from "../../http/memoHttp";

let pageNo = 0;

export default function ReceiveMemoApp({ token, myInfo }) {
  const [needLoad, setNeedLoad] = useState();
  const [selectRcvMemoId, setSelectRcvMemoId] = useState();

  const isSelect = selectRcvMemoId !== undefined;

  // 수신 쪽지 목록
  const fetchLoadReceiveMemos = useCallback(loadReceiveMemos, []);
  const fetchParam = useMemo(() => {
    return { token, needLoad };
  }, [token, needLoad]);

  const { data, isLoading } = useFetch(
    undefined,
    fetchLoadReceiveMemos,
    fetchParam
  );

  const { count, pages, next } = data || {};
  const { body: receiveMemos } = data || {};

  const onRowClickHandler = async (rcvMemoId, rcvDate) => {
    setSelectRcvMemoId(rcvMemoId);
    if (rcvDate === null || rcvDate === "") {
      // 수신쪽지 읽음처리
      const json = await readReceiveMemo(token, rcvMemoId);
    }
  };

  // 쪽지 보관
  const onClickSaveReceiveMenoHandler = async (rcvMemoId, rcvSaveYn) => {
    const newSaveState = rcvSaveYn === "N" ? "Y" : "N";
    const json = await saveReceiveMemo(token, rcvMemoId, newSaveState);
    if (json.body) {
      setNeedLoad(Math.random());
    } else if (json.errors) {
      alert(json.errors);
    }
  };

  const columns = [
    {
      title: (
        <span className={`${style.rowTitle}`}>
          <BsStar />
        </span>
      ),
      dataIndex: "rcvSaveYn",
      key: "rcvSaveYn",
      width: "5%",
      render: (text, row) => (
        <span
          onClick={() => onClickSaveReceiveMenoHandler(row.rcvMemoId, text)}
          className={`${style.cellSpan} ${
            text === "Y" ? style.listIconActive : style.listIcon
          }`}
        >
          {text === "Y" ? <BsFillStarFill /> : <BsStar />}
        </span>
      ),
    },
    {
      title: (
        <span className={`${style.rowTitle}`}>
          <BsEnvelope />
        </span>
      ),
      dataIndex: "rcvDate",
      key: "rcvDate",
      width: "5%",
      render: (text) => (
        <span
          className={`${style.cellSpan} ${
            text !== null ? style.listIcon : style.listIconActive
          }`}
        >
          {text !== null ? <BsEnvelopeOpen /> : <BsEnvelopeFill />}
        </span>
      ),
    },
    {
      title: <span className={`${style.rowTitleMemo}`}>제목</span>,
      dataIndex: ["sendMemoVO", "memoTtl"],
      key: "memoTtl",
      render: (receiveMemos, row) => (
        <span
          style={{ cursor: "pointer" }}
          onClick={() => onRowClickHandler(row.rcvMemoId, row.rcvDate)}
          className={`${style.rowCellText} ${
            row.rcvDate !== null ? "" : style.isNotChecked
          }`}
        >
          {receiveMemos}
        </span>
      ),
    },
    {
      title: <span className={`${style.rowTitle}`}>수신일</span>,
      dataIndex: ["sendMemoVO", "sendDate"],
      key: "sendDate",
      width: "15%",
      render: (text) => (
        <span className={`${style.isNotImportant} ${style.dispalyDate}`}>
          {text}
        </span>
      ),
    },
  ];

  const filterOptions = [
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
    <div className={style.bodyContainer}>
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
                rowClassName={style.tableRow}
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
            myInfo={myInfo}
            count={count}
            selectRcvMemoId={selectRcvMemoId}
            setSelectRcvMemoId={setSelectRcvMemoId}
            setNeedLoad={setNeedLoad}
          />
        )}
      </div>
    </div>
  );
}
