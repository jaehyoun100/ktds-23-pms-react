import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getApprInfo,
  getApprovalListByApprover,
} from "../../http/approvalHttp";
import Table from "../../utils/Table";
import ApprovalModal from "./ApprovalModal";

export default function ApprovalApp() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.tokenInfo);
  const { apprCnt, apprList } = useSelector((state) => state.approvalInfo);

  const [open, setOpen] = useState(false);
  const [selectApprId, setSelectApprId] = useState();

  const showModal = (apprId) => {
    return () => {
      setOpen(true);
      setSelectApprId(apprId);
      dispatch(getApprInfo(apprId, token));
    };
  };

  useEffect(() => {
    dispatch(getApprovalListByApprover(token));
  }, [token, dispatch, open]);

  const columns = [
    {
      title: "결제종류",
      type: "select",
      key: "apprType",
      dataIndex: "apprType",
      render: (data, row) => (
        <span style={{ cursor: "pointer" }} onClick={showModal(row.apprId)}>
          {data}
        </span>
      ),
      width: "10%",
    },
    {
      title: "승인여부",
      dataIndex: "apprYn",
      key: "apprYn",
      render: (data, row) => (
        <span style={{ cursor: "pointer" }} onClick={showModal(row.apprId)}>
          {data}
        </span>
      ),
      width: "10%",
    },
    {
      title: "결제요청자",
      dataIndex: ["reqtrVO", "empName"],
      key: "apprReqtr",
      render: (data, row) => (
        <span style={{ cursor: "pointer" }} onClick={showModal(row.apprId)}>
          {data}
        </span>
      ),
    },
    {
      title: "승인담당",
      dataIndex: ["approverVO", "empName"],
      key: "approver",
      render: (data, row) => (
        <span style={{ cursor: "pointer" }} onClick={showModal(row.apprId)}>
          {data}
        </span>
      ),
    },
    {
      title: "사유",
      dataIndex: "apprRsn",
      key: "apprRsn",
      render: (data, row) => (
        <span style={{ cursor: "pointer" }} onClick={showModal(row.apprId)}>
          {data}
        </span>
      ),
      width: "15%",
    },
    {
      title: "결제요청일",
      dataIndex: "apprDate",
      key: "apprDate",
      render: (data, row) => (
        <span style={{ cursor: "pointer" }} onClick={showModal(row.apprId)}>
          {data}
        </span>
      ),
      width: "15%",
    },
    {
      title: "결제마감일",
      dataIndex: "apprEndDate",
      key: "apprEndDate",
      render: (data, row) => (
        <span style={{ cursor: "pointer" }} onClick={showModal(row.apprId)}>
          {data}
        </span>
      ),
      width: "15%",
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
      <h4>결제 승인 요청</h4>
      {apprCnt && <div>{apprCnt}개의 요청건이 있습니다. </div>}
      {apprList && (
        <>
          <Table
            columns={columns}
            dataSource={apprList}
            rowKey={(apprList) => apprList.apprId}
          />
          <ApprovalModal
            open={open}
            setOpen={setOpen}
            apprId={selectApprId}
            footer
          />
        </>
      )}
    </>
  );
}
