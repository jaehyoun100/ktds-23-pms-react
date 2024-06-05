import { useCallback, useEffect, useMemo, useState } from "react";
import { loadSupplyLogList } from "../../../http/supplyHttp";
import Table from "../../../utils/Table";
import style from "../supply.module.css";

export default function SupplyLogView({
  setIsSupplyLogViewMode,
  needReload,
  token,
}) {
  const [selectedSplLogId, setSelectedSplLogId] = useState();
  const [selectedReqRsn, setSelectedReqRsn] = useState("");
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const isSelect = selectedSplLogId !== undefined;

  const memoizedLoadSupplyLogList = useCallback(loadSupplyLogList, []);
  const memoizedToken = useMemo(() => {
    return { token, needReload };
  }, [token, needReload]);

  useEffect(() => {
    const fetchingData = async () => {
      const json = await memoizedLoadSupplyLogList({ ...memoizedToken });

      const flattenedData = json.body.map((item) => ({
        ...item,
        splCtgr: item.supplyVO.splCtgr,
        splName: item.supplyVO.splName,
        empName: `${item.employeeVO.empName} (${item.employeeVO.email})`,
      }));

      setData(flattenedData);
      setIsLoading(false);
    };

    fetchingData();
  }, [memoizedLoadSupplyLogList, memoizedToken]);

  const columns = [
    {
      title: "신청인",
      dataIndex: "empName",
      key: "empName",
    },
    {
      title: "카테고리",
      dataIndex: "splCtgr",
      key: "splCtgr",
    },
    {
      title: "제품 명",
      dataIndex: "splName",
      key: "splName",
    },
    {
      title: "신청 갯수",
      dataIndex: "reqCnt",
      key: "reqCnt",
    },
    {
      title: "신청일",
      dataIndex: "reqDt",
      key: "reqDt",
    },
  ];

  const simplifiedColumns = [
    {
      title: "신청인",
      dataIndex: "empName",
      key: "empName",
    },
    {
      title: "제품 명",
      dataIndex: "splName",
      key: "splName",
    },
  ];

  const filterOptions = [
    {
      label: "카테고리",
      value: "splCtgr",
    },
    {
      label: "제품 명",
      value: "splName",
    },
    {
      label: "신청인",
      value: "empName",
    },
  ];

  const onRowClickHandler = (row) => {
    setSelectedSplLogId((prevId) =>
      prevId === row.splLogId ? undefined : row.splLogId
    );
    setSelectedReqRsn(row.reqRsn);
  };

  const backToListButtonHandler = () => {
    setIsSupplyLogViewMode(false);
  };

  return (
    <>
      <div className={style.supplyAppContainer}>
        <div className={style.tableComponent}>
          <Table
            columns={isSelect ? simplifiedColumns : columns}
            dataSource={data}
            rowKey={(dt) => dt.splLogId}
            filter
            filterOptions={filterOptions}
            onRow={(record) => {
              return {
                onClick: () => {
                  onRowClickHandler(record);
                },
                style: { cursor: "pointer" },
              };
            }}
          />
        </div>
        {isSelect && (
          <div className={style.supplyRequestReason}>
            <h3>신청 사유</h3>
            <p>{selectedReqRsn}</p>
          </div>
        )}
      </div>
      <button onClick={backToListButtonHandler}>목록으로</button>
    </>
  );
}
