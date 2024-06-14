import { useCallback, useEffect, useMemo, useState } from "react";
import { loadSupplyApprovalList } from "../../../http/supplyHttp";
import Table from "../../../utils/Table";
import style from "../supply.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function SupplyLogView() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { token } = useSelector((state) => state.tokenInfo);
  const navigate = useNavigate();

  const memoizedLoadSupplyApprovalList = useCallback(
    loadSupplyApprovalList,
    []
  );
  const memoizedToken = useMemo(() => {
    return { token };
  }, [token]);

  useEffect(() => {
    const fetchingData = async () => {
      const json = await memoizedLoadSupplyApprovalList({ ...memoizedToken });

      const flattenedData = json.body.map((item) => ({
        ...item,
        empName: `${item.employeeVO.empName} (${item.employeeVO.email})`,
        reqDt: item.approvalVO.apprDate,
      }));

      setData(flattenedData);
      setIsLoading(false);
    };

    fetchingData();
  }, [memoizedLoadSupplyApprovalList, memoizedToken]);

  const columns = [
    {
      title: "신청인",
      dataIndex: "empName",
      key: "empName",
    },
    {
      title: "신청 유형",
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
    {
      title: "승인 여부",
      dataIndex: "splApprYn",
      key: "splApprYn",
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

  const backToListButtonHandler = () => {
    navigate(-1);
  };

  return (
    <>
      <div className={style.supplyAppContainer}>
        <div className={style.supplyLogTableComponent}>
          <Table
            columns={columns}
            dataSource={data}
            rowKey={(dt) => dt.splLogId}
            filter
            filterOptions={filterOptions}
          />
        </div>
      </div>
      <button onClick={backToListButtonHandler}>목록으로</button>
    </>
  );
}
