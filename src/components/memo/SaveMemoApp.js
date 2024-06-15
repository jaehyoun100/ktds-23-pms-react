import {
  BsEnvelope,
  BsEnvelopeFill,
  BsEnvelopeOpen,
  BsStar,
  BsFillStarFill,
} from "react-icons/bs";
import Table from "../../utils/Table";
import style from "./Memo.module.css";
import { useFetch } from "../hook/useFetch";

export default function SaveMemoApp() {
  // 보관 쪽지 목록

  return (
    <div className={style.bodyContainer}>
      <div className={style.memoContainer}>
        {/* {token && !isSelect && (
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
          count={count}
          selectRcvMemoId={selectRcvMemoId}
          setSelectRcvMemoId={setSelectRcvMemoId}
          setNeedLoad={setNeedLoad}
        />
      )} */}
      </div>
    </div>
  );
}
