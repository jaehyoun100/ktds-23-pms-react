import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApprovalList } from "../../http/approvalHttp";
import Table from "../../utils/Table";

export default function ApprovalApp() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.tokenInfo);
  const { apprCnt, apprList } = useSelector((state) => state.approvalInfo);

  useEffect(() => {
    dispatch(getApprovalList(token));
  }, [token, dispatch]);

  const columns = [
    {
      title: "결제내용",
      dataIndex: ["employeeVO", "empName"],
      key: "empName",
    },
    {
      title: "결제요청자",
      dataIndex: "apprReqtr",
      key: "apprReqtr",
    },
    {
      title: "결제요청일",
      dataIndex: "apprDate",
      key: "apprDate",
    },
    {
      title: "결제마감일",
      dataIndex: "apprEndDate",
      key: "apprEndDate",
    },
    // {
    //   title: "승인",
    // },
    // {
    //   title: "거절",
    // },
  ];

  return (
    <>
      <div>{apprCnt}개가 있어요 </div>
      {apprList && (
        <>
          <div>있어요 </div>
          <Table
            columns={columns}
            dataSource={apprList}
            rowKey={(apprList) => apprList.apprId}
          />
        </>
      )}
    </>
  );
}
