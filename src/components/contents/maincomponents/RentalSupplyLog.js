import { useCallback, useEffect, useMemo, useState } from "react";
import { loadRentalSupplyApprovalList } from "../../../http/rentalSupplyHttp";
import Table from "../../../utils/Table";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, message } from "antd";
import w from "../ContentMain.module.css";
import p from "./project.module.css";

export default function MainRentalSupplyLog() {
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

  const columns = [
    {
      title: "제품 명",
      dataIndex: "rsplName",
      key: "rsplName",
      width: "50%",
    },
    {
      title: "승인 여부",
      dataIndex: "rsplApprYn",
      key: "rsplApprYn",
      width: "50%",
    },
  ];

  const backToListButtonHandler = () => {
    navigate(-1);
  };

  return (
    <div className={p.overflowProTable}>
      <table className={p.proTable}>
        <thead className={p.proTableThead}>
          <tr style={{ borderBottom: "1px solid #ccc" }}>
            <th style={{ width: "50%" }}>제품 명</th>
            <th style={{ width: "50%" }}>승인 여부</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, idx) => {
              return (
                <tr key={idx} style={{ borderBottom: "1px solid #ccc" }}>
                  <td>{item.rsplName}</td>
                  <td>{item.rsplApprYn}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
