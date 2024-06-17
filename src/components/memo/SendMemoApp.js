import { useCallback, useMemo, useState } from "react";
import { loadSendMemos, saveSendMemo } from "../../http/memoHttp";
import { useFetch } from "../hook/useFetch";
import {
  BsEnvelope,
  BsEnvelopeOpen,
  BsStar,
  BsFillStarFill,
  BsEnvelopeCheck,
  BsEnvelopeX,
  BsEnvelopeArrowUp,
  BsEnvelopeFill,
} from "react-icons/bs";
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

  const onRowClickHandler = async (sendMemoId) => {
    setSelectSendMemoId(sendMemoId);
  };

  // 쪽지 보관
  const onClickSaveSendMenoHandler = async (sendMemoId, sendSaveYn) => {
    const newSaveState = sendSaveYn === "N" ? "Y" : "N";
    const json = await saveSendMemo(token, sendMemoId, newSaveState);
    if (json.body) {
      setNeedLoad(Math.random());
    } else if (json.errors) {
      alert(json.erros);
    }
  };

  const columns = [
    {
      title: (
        <span className={`${style.rowTitle}`}>
          <BsStar />
        </span>
      ),
      dataIndex: "sendSaveYn",
      key: "sendSaveYn",
      width: "5%",
      render: (text, row) => (
        <span
          onClick={() => onClickSaveSendMenoHandler(row.sendMemoId, text)}
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
      dataIndex: "sendDate",
      key: "sendDate",
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
      title: (
        <span className={`${style.rowTitle}`}>
          <BsEnvelopeArrowUp />
        </span>
      ),
      dataIndex: "sendStsCode",
      key: "sendStsCode",
      width: "5%",
      render: (text) => (
        <span
          className={`${style.cellSpan} ${
            text === "1502" ? style.listIcon : style.listIconActive
          }`}
        >
          {text === "1502" ? (
            <BsEnvelopeX style={{ color: "#c43921" }} />
          ) : (
            <BsEnvelopeCheck />
          )}
        </span>
      ),
    },
    {
      title: <span className={`${style.rowTitle}`}>발신일</span>,
      dataIndex: "sendDate",
      key: "sendDate",
      width: "10%",
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
                rowClassName={style.tableRow}
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
            count={count}
            selectSendMemoId={selectSendMemoId}
            setSelectSendMemoId={setSelectSendMemoId}
            setNeedLoad={setNeedLoad}
          />
        )}
      </div>
    </div>
  );
}
