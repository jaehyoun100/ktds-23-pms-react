import { Button, Descriptions, Input, Modal } from "antd";
import Spacer from "../employee/components/Spacer";
import { useDispatch, useSelector } from "react-redux";
import { approveOneRequest } from "../../http/approvalHttp";
import { useRef } from "react";

export default function ApprovalModal({ open, setOpen, apprId, footer }) {
  const { apprInfo, approvalVO } = useSelector((state) => state.approvalInfo);
  const { token } = useSelector((state) => state.tokenInfo);
  const dispatch = useDispatch();
  const apprRsnRef = useRef("");

  const onApprHandler = (apprId) => {
    return () => {
      const apprRsn = apprRsnRef.current.input.value;
      const apprYn = "Y";
      if (apprRsn !== undefined && apprRsn.length > 10) {
        alert("사유는 10글자 이하로 적어주세요");
        return;
      }

      setOpen(false);
      dispatch(approveOneRequest(apprId, apprRsn, apprYn, token));
    };
  };
  const onRefuseHandler = (apprId) => {
    return () => {
      const apprRsn = apprRsnRef.current.input.value;
      const apprYn = "N";
      if (apprRsn === undefined) {
        alert("사유는 필수입니다");
        return;
      } else if (apprRsn.length > 10) {
        alert("사유는 10글자 이하로 적어주세요");
        return;
      }

      setOpen(false);
      dispatch(approveOneRequest(apprId, apprRsn, apprYn, token));
    };
  };
  const onCancelHandelr = () => {
    setOpen(false);
  };

  const supplyItems = [
    {
      key: "splCtgr",
      label: "제품 카테고리",
      children: apprInfo?.splCtgr,
    },
    {
      key: "splName",
      label: "결제품목",
      children: apprInfo?.splName,
    },
    {
      key: "empName",
      label: "신청인",
      children: apprInfo?.employeeVO?.empName,
    },
    {
      key: "splPrice",
      label: "제품금액",
      children: apprInfo?.splPrice,
    },
    {
      key: "invQty",
      label: "변경재고",
      children: apprInfo?.invQty,
    },
    {
      key: "splDtl",
      label: "제품 상세설명",
      children: apprInfo?.splDtl,
    },
    // {
    //   key: "splRqstType",
    //   label: "결제타입",
    //   children: apprInfo?.splRqstType,
    // },
  ];

  const rsupplyItems = [
    {
      key: "rsplCtgr",
      label: "제품 카테고리",
      children: apprInfo?.rsplCtgr,
    },
    {
      key: "rsplName",
      label: "결제품목",
      children: apprInfo?.rsplName,
    },
    {
      key: "empName",
      label: "신청인",
      children: apprInfo?.employeeVO?.empName,
    },
    {
      key: "rsplPrice",
      label: "제품금액",
      children: apprInfo?.rsplPrice,
    },
    {
      key: "invQty",
      label: "변경재고",
      children: apprInfo?.invQty,
    },
    {
      key: "rsplDtl",
      label: "제품 상세설명",
      children: apprInfo?.rsplDtl,
    },
    // {
    //   key: "splRqstType",
    //   label: "결제타입",
    //   children: apprInfo?.splRqstType,
    // },
  ];

  const departmentItems = [
    {
      key: "deptName",
      label: "신청 부서",
      children: apprInfo?.deptName,
    },
    {
      key: "deptLeadId",
      label: "부서장",
      children: apprInfo?.edlEmpName,
    },
    {
      key: "deptApprReqtr",
      label: "신청인",
      children: apprInfo?.eaEmpName,
    },
    {
      key: "deptApprType",
      label: "변경내용",
      children: apprInfo?.deptApprType,
    },
    {
      key: "deptApprReason",
      label: "변경사유",
      children: apprInfo?.deptApprReason,
    },
    // {
    //   key: "splRqstType",
    //   label: "결제타입",
    //   children: apprInfo?.splRqstType,
    // },
  ];
  const footerOption =
    footer && (approvalVO.apprYn === null || approvalVO.apprYn === undefined)
      ? [
          <h6 key="appr">상기 내용의 결제를 요청드립니다</h6>,
          <Input
            ref={apprRsnRef}
            key="rsnInput"
            placeholder="사유를 입력해주세요(10자이내)"
          ></Input>,
          <Spacer key="forMargin1" margin={5} />,
          <Button key="apprBtn" onClick={onApprHandler(apprId)}>
            승인
          </Button>,
          <Spacer key="forMargin2" margin={5} />,
          <Button key="refuseBtn" onClick={onRefuseHandler(apprId)}>
            거절
          </Button>,
        ]
      : [];

  return (
    <>
      <Modal
        open={open}
        onCancel={onCancelHandelr} //x버튼 클릭
        footer={footerOption}
      >
        {/* 정보 가져오기 */}
        <div></div>
        {apprInfo && apprInfo.splApprId && (
          <>
            <Descriptions
              column={{ xxl: 1, xl: 1, lg: 1, md: 1 }}
              size="small"
              bordered
              items={supplyItems}
            />
          </>
        )}
        {apprInfo && apprInfo.rsplApprId && (
          <>
            <Descriptions
              column={{ xxl: 1, xl: 1, lg: 1, md: 1 }}
              size="small"
              bordered
              items={rsupplyItems}
            />
          </>
        )}
        {apprInfo && apprInfo.deptApprId && (
          <>
            <Descriptions
              column={{ xxl: 1, xl: 1, lg: 1, md: 1 }}
              size="small"
              bordered
              items={departmentItems}
            />
          </>
        )}
      </Modal>
    </>
  );
}
