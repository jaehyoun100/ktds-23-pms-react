import { useCallback, useMemo, useState } from "react";
import w from "../ContentMain.module.css";
import style from "../../memo/Memo.module.css";
import {
  loadMyData,
  loadReceiveMemos,
  readReceiveMemo,
} from "../../../http/memoHttp";
import { useFetch } from "../../hook/useFetch";
import TableNoPage from "../../../utils/TableNoPage";
import ReceiveMemoView from "../../memo/ReceiveMemoView";
import {
  BsEnvelope,
  BsEnvelopeFill,
  BsEnvelopeOpen,
  BsStar,
  BsFillStarFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import ReceiveMemoViewDetail from "../../memo/ReceiveMemoViewDetail";

export default function MainMemo() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  // const { myInfo } = useSelector((state) => state.myInfo);
  // console.log(myInfo);
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
  const { data: userData } = useFetch(undefined, fetchLoadMyData(), fetchToken);
  const { body: myInfo } = userData || {};

  const [needLoad, setNeedLoad] = useState();
  const [selectRcvMemoId, setSelectRcvMemoId] = useState();

  const isSelect = selectRcvMemoId !== undefined;

  // 수신 쪽지 목록`
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
    navigate("/memo", { state: { rcvMemoId } });
    // setSelectRcvMemoId(rcvMemoId);
    // if (rcvDate === null || rcvDate === "") {
    //   // 수신쪽지 읽음처리
    //   const json = await readReceiveMemo(token, rcvMemoId);
    // }
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
      width: "20%",
      render: (text) => (
        <span className={`${style.isNotImportant} ${style.dispalyDate}`}>
          {text}
        </span>
      ),
    },
  ];

  return (
    <>
      {token && !isSelect && (
        <div className={w.cardBodyContent}>
          <div className={w.border}>
            <div>
              <TableNoPage
                columns={columns}
                dataSource={receiveMemos}
                rowKey={(dt) => dt.rcvMemoId}
                pagination={false}
              />
            </div>
          </div>
        </div>
      )}
      {token && isSelect && (
        <ReceiveMemoViewDetail
          token={token}
          myInfo={myInfo}
          selectRcvMemoId={selectRcvMemoId}
          setSelectRcvMemoId={setSelectRcvMemoId}
          setNeedLoad={setNeedLoad}
        />
      )}
    </>
  );
}
