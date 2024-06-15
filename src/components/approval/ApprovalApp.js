import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApprInfo, getApprovalList } from "../../http/approvalHttp";
import Table from "../../utils/Table";
import ApprovalModal from "./ApprovalModal";

export default function ApprovalApp() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.tokenInfo);
  const { apprCnt, apprList } = useSelector((state) => state.approvalInfo);

  const [open, setOpen] = useState(false);

  const showModal = (apprId) => {
    setOpen(true);
    // getApprInfo(apprId);
  };

  useEffect(() => {
    dispatch(getApprovalList(token));
  }, [token, dispatch]);

  const columns = [
    {
      title: "결제종류",
      key: "apprType",
      dataIndex: "apprType",
      // option: apprList.map((apprType) => {
      //   if ((apprType = "supply")) {
      //     return "비품";
      //   }
      //   return "";
      // }),
      render: (data, row) => (
        <span style={{ cursor: "pointer" }} onClick={showModal}>
          {data}
        </span>
      ),
    },
    {
      title: "결제요청자",
      dataIndex: "apprReqtr",
      key: "apprReqtr",
      render: (data, row) => (
        <span style={{ cursor: "pointer" }} onClick={showModal}>
          {data}
        </span>
      ),
    },
    {
      title: "결제요청일",
      dataIndex: "apprDate",
      key: "apprDate",
      render: (data, row) => (
        <span style={{ cursor: "pointer" }} onClick={showModal}>
          {data}
        </span>
      ),
    },
    {
      title: "결제마감일",
      dataIndex: "apprEndDate",
      key: "apprEndDate",
      render: (data, row) => (
        <span style={{ cursor: "pointer" }} onClick={showModal}>
          {data}
        </span>
      ),
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
          <Table
            columns={columns}
            dataSource={apprList}
            rowKey={(apprList) => apprList.apprId}
          />
          <ApprovalModal open={open} setOpen={setOpen} />
        </>
      )}
    </>
  );
}
