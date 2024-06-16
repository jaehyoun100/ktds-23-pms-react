import { useCallback, useEffect, useMemo, useState } from "react";
import { loadRentalSupplyApprovalList } from "../../../http/rentalSupplyHttp";
import Table from "../../../utils/Table";
import style from "../rentalSupply.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function RentalSupplyLogView() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { token } = useSelector((state) => state.tokenInfo);
  const navigate = useNavigate();

  const memoizedLoadRentalSupplyApprovalList = useCallback(
    loadRentalSupplyApprovalList,
    []
  );
  const memoizedToken = useMemo(() => {
    return { token };
  }, [token]);

  useEffect(() => {
    const fetchingData = async () => {
      const json = await memoizedLoadRentalSupplyApprovalList({
        ...memoizedToken,
      });

      const flattenedData = json.body.map((item) => ({
        ...item,
        empName: `${item.employeeVO.empName} (${item.employeeVO.email})`,
        reqDt: item.approvalVO.apprDate,
      }));

      setData(flattenedData);
      setIsLoading(false);
    };

    fetchingData();
  }, [memoizedLoadRentalSupplyApprovalList, memoizedToken]);

  const columns = [
    {
      title: "신청인",
      dataIndex: "empName",
      key: "empName",
    },
    {
      title: "신청 유형",
      dataIndex: "rsplRqstType",
      key: "rsplRqstType",
    },
    {
      title: "카테고리",
      dataIndex: "rsplCtgr",
      key: "rsplCtgr",
    },
    {
      title: "제품 명",
      dataIndex: "rsplName",
      key: "rsplName",
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
      dataIndex: "rsplApprYn",
      key: "rsplApprYn",
    },
  ];

  const filterOptions = [
    {
      label: "카테고리",
      value: "rsplCtgr",
    },
    {
      label: "제품 명",
      value: "rsplName",
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
      <div className={style.rentalSupplyAppContainer}>
        <div className={style.rentalSupplyLogTableComponent}>
          <Table
            columns={columns}
            dataSource={data}
            rowKey={(dt) => dt.rsplLogId}
            filter
            filterOptions={filterOptions}
          />
        </div>
      </div>
      <button onClick={backToListButtonHandler}>목록으로</button>
    </>
  );
}
