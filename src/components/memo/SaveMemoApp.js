import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Table from "../../utils/Table";
import { useFetch } from "../hook/useFetch";
import style from "./Memo.module.css";
import {
  loadMyData,
  loadSaveMemos,
  saveReceiveMemo,
  saveSendMemo,
} from "../../http/memoHttp";
import SaveMemoView from "./SaveMemoView";
import {
  BsEnvelope,
  BsEnvelopeFill,
  BsEnvelopeOpen,
  BsStar,
  BsFillStarFill,
  BsInboxes,
} from "react-icons/bs";

let pageNo = 0;

export default function ReceiveMemoApp() {
  const token = localStorage.getItem("token");

  const fetchLoadMyData = useCallback(() => {
    if (token) {
      return loadMyData;
    } else {
      return () => {
        return undefined;
      };
    }
  }, [token]);
  const fetchToken = useMemo(() => {
    return { token };
  }, [token]);
  const { data: myData } = useFetch(undefined, fetchLoadMyData(), fetchToken);
  const { body: myInfo } = myData || {};

  const [needLoad, setNeedLoad] = useState();
  const [selectMemo, setSelectMemo] = useState();

  const [allMemos, setAllMemos] = useState([]);
  const [isSave, setIsSave] = useState();
  const [memoDate, setMemoDate] = useState();

  const isSelect = selectMemo !== undefined;

  // 수신 쪽지 목록
  const fetchLoadSaveReceiveMemos = useCallback(loadSaveMemos, []);
  const fetchParam = useMemo(() => {
    return { token, needLoad };
  }, [token, needLoad]);

  const { data, isLoading } = useFetch(
    undefined,
    fetchLoadSaveReceiveMemos,
    fetchParam
  );

  // const { count, pages, next } = data || {};
  const { sendJson, rcvJson } = data || {};
  const { count: sendCount } = sendJson || {};
  const { body: saveSendMemos } = sendJson || {};
  const { count: rcvCount } = rcvJson || {};
  const { body: saveRcvMemos } = rcvJson || {};
  const allCount = sendCount + rcvCount || "";

  // 수신/발신 결합데이터
  useEffect(() => {
    const combinedData = [
      ...(Array.isArray(saveSendMemos) ? saveSendMemos : []),
      ...(Array.isArray(saveRcvMemos) ? saveRcvMemos : []),
    ].map((item, index) => ({
      key: index,
      ...item,
    }));

    // rcvDate와 sendDate를 기준 최신순으로 정렬
    combinedData.sort((a, b) => {
      const dateA = new Date(a.rcvDate || a.sendDate); // rcvDate가 없을 경우 sendDate 사용
      const dateB = new Date(b.rcvDate || b.sendDate);
      return dateB - dateA; // 최신 날짜가 작은 순서대로 정렬
    });

    setAllMemos(combinedData);
  }, [saveSendMemos, saveRcvMemos]);

  // 상세조회
  const onRowClickHandler = async (memo) => {
    console.log("save App", memo);
    setSelectMemo(memo);
  };
  useEffect(() => {}, [selectMemo]);

  // 보관기능
  const onClickSaveReceiveMenoHandler = async (memo) => {
    const path = memo.rcvMemoId ? "receive" : "send";
    const saveValue = memo.rcvMemoId ? memo.rcvSaveYn : memo.sendSaveYn;
    console.log(saveValue);
    const newSaveState = saveValue === "N" ? "Y" : "N";
    console.log(newSaveState);

    if (path === "receive") {
      const json = await saveReceiveMemo(token, memo.rcvMemoId, newSaveState);
      if (json.body) {
        setNeedLoad(Math.random());
      } else if (json.errors) {
        alert(json.errors);
      }
    } else if (path === "send") {
      const json = await saveSendMemo(token, memo.sendMemoId, newSaveState);
      if (json.body) {
        setNeedLoad(Math.random());
      } else if (json.errors) {
        alert(json.erros);
      }
    } else {
      alert("쪽지 보관에 실패하였습니다.");
    }
  };

  const columns = [
    {
      title: (
        <span className={`${style.rowTitle}`}>
          <BsStar />
        </span>
      ),
      dataIndex: "saveYn",
      key: "saveYn",
      width: "5%",
      render: (text, dt) => {
        if (dt) {
          dt.rcvMemoId ? setIsSave(dt.rcvSaveYn) : setIsSave(dt.sendSaveYn);
        }
        return (
          <span
            onClick={() => onClickSaveReceiveMenoHandler(dt)}
            className={`${style.cellSpan} ${
              isSave === "Y" ? style.listIconActive : style.listIcon
            }`}
          >
            {isSave === "Y" ? <BsFillStarFill /> : <BsStar />}
          </span>
        );
      },
    },
    {
      title: (
        <span className={`${style.rowTitle}`}>
          <BsEnvelope />
        </span>
      ),
      dataIndex: "isRead",
      key: "isRead",
      width: "5%",
      render: (text, dt) => {
        if (dt) {
          dt.rcvMemoId ? setMemoDate(dt.rcvDate) : setMemoDate(dt.sendDate);
        }
        return (
          <span
            className={`${style.cellSpan} ${
              memoDate !== null ? style.listIcon : style.listIconActive
            }`}
          >
            {memoDate !== null ? <BsEnvelopeOpen /> : <BsEnvelopeFill />}
          </span>
        );
      },
    },
    {
      title: (
        <span className={`${style.rowTitle}`}>
          <BsInboxes />
        </span>
      ),
      dataIndex: "allmemos",
      key: "sendDate",
      width: "10%",
      render: (text, dt) => (
        <span className={`${style.isNotImportant} ${style.cellSpan}`}>
          {dt.rcvMemoId ? "[받은쪽지함]" : "[보낸쪽지함]"}
        </span>
      ),
    },
    {
      title: <span className={`${style.rowTitleMemo}`}>제목</span>,
      dataIndex: "memoTtl",
      key: "memoTtl",
      render: (text, dt) => (
        <span
          style={{ cursor: "pointer" }}
          className={`${style.rowCellText}`}
          onClick={() => onRowClickHandler(dt)}
        >
          {dt.rcvMemoId ? dt.sendMemoVO.memoTtl : dt.memoTtl}
        </span>
      ),
    },
    {
      title: <span className={`${style.rowTitle}`}></span>,
      dataIndex: "date",
      key: "date",
      width: "15%",
      render: (text, dt) => (
        <span className={`${style.isNotImportant} ${style.dispalyDate}`}>
          {dt.rcvMemoId ? dt.rcvDate : dt.sendDate}
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
    getCheckboxProps: (saveRcvMemos) => ({
      disabled: saveRcvMemos.rcvMemoId === "Disabled User",
      rcvMemoId: saveRcvMemos.rcvMemoId,
    }),
  };

  return (
    <>
      <div className={style.bodyContainer}>
        <div className={style.memoContainer}>
          {isLoading && <div>데이터를 불러오는 중입니다.</div>}
          {!isLoading && allMemos && (
            <>
              {token && !isSelect && (
                <>
                  <div className={style.memoHeader}>
                    <div className={style.titleArea}>
                      <h2 className={style.memoboxTitle}>
                        <span className={style.memoboxText}>보관쪽지함</span>
                        <span className={style.memoboxText}>{allCount}</span>
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
                      dataSource={allMemos}
                      rowKey={(dt) => dt.rcvMemoId || dt.sendMemoId}
                      filter
                      filterOptions={filterOptions}
                    />
                  </div>
                </>
              )}
              {token && isSelect && (
                <SaveMemoView
                  token={token}
                  myInfo={myInfo}
                  count={allCount}
                  selectMemo={selectMemo}
                  setSelectMemo={setSelectMemo}
                  setNeedLoad={setNeedLoad}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
