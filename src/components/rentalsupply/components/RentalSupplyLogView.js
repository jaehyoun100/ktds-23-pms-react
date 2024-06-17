import { useCallback, useEffect, useMemo, useState } from "react";
import {
  loadRentalSupplyApprovalList,
  returnRentalSupply,
} from "../../../http/rentalSupplyHttp";
import Table from "../../../utils/Table";
import style from "../rentalSupply.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

export default function RentalSupplyLogView() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { token } = useSelector((state) => state.tokenInfo);
  const navigate = useNavigate();

  const memoizedLoadRentalSupplyApprovalList = useCallback(
    loadRentalSupplyApprovalList,
    []
  );
  const memoizedToken = useMemo(() => ({ token }), [token]);

  useEffect(() => {
    const fetchingData = async () => {
      const json = await memoizedLoadRentalSupplyApprovalList({
        ...memoizedToken,
      });

      const flattenedData = json.body.map((item) => ({
        ...item,
        empName: `${item.employeeVO.empName} (${item.employeeVO.email})`,
        reqDt: item.approvalVO.apprDate,
        rsplRqstQty: item.rsplRqstQty === 0 ? undefined : item.rsplRqstQty,
      }));

      setData(flattenedData);
      setIsLoading(false);
    };

    fetchingData();
  }, [memoizedLoadRentalSupplyApprovalList, memoizedToken]);

  const handleReturnClick = async (rsplApprId, invQty) => {
    const response = await returnRentalSupply({ rsplApprId, invQty, token });
    if (response.status === "OK") {
      message.success("반납 요청이 성공적으로 처리되었습니다.");
      // 성공적으로 반납 후 데이터 갱신
      setData(
        data.map((item) =>
          item.rsplApprId === rsplApprId ? { ...item, rtrnYn: "Y" } : item
        )
      );
    } else {
      message.error("반납 요청 처리에 실패했습니다.");
    }
  };

  const columns = [
    {
      title: "신청인",
      dataIndex: "empName",
      key: "empName",
      width: "16%",
    },
    {
      title: "신청 유형",
      dataIndex: "rsplRqstType",
      key: "rsplRqstType",
      width: "12%",
    },
    {
      title: "카테고리",
      dataIndex: "rsplCtgr",
      key: "rsplCtgr",
      width: "12%",
    },
    {
      title: "제품 명",
      dataIndex: "rsplName",
      key: "rsplName",
      width: "12%",
    },
    {
      title: "신청 갯수",
      dataIndex: "rsplRqstQty",
      key: "rsplRqstQty",
      width: "12%",
    },
    {
      title: "신청일",
      dataIndex: "reqDt",
      key: "reqDt",
      width: "12%",
    },
    {
      title: "승인 여부",
      dataIndex: "rsplApprYn",
      key: "rsplApprYn",
      width: "12%",
    },
    {
      title: "반납 여부",
      dataIndex: "rtrnYn",
      key: "rtrnYn",
      width: "12%",
      render: (text, record) =>
        text && record.rsplApprYn !== "N" ? (
          <span>
            {text === "Y" ? (
              <button className="returnButton disabled" disabled>
                반납 완료
              </button>
            ) : (
              <button
                className="returnButton"
                onClick={() =>
                  handleReturnClick(record.rsplApprId, record.rsplRqstQty)
                }
              >
                반납
              </button>
            )}
          </span>
        ) : null,
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
      <div>
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
      <div className={style.buttonContainer}>
        <button onClick={backToListButtonHandler}>목록으로</button>
      </div>
    </>
  );
}
