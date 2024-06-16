import { Button, Input, Modal } from "antd";
import Spacer from "../employee/components/Spacer";
import { useDispatch, useSelector } from "react-redux";
import { approveOneRequest } from "../../http/approvalHttp";
import { useRef } from "react";

export default function ApprovalModal({ open, setOpen, apprId, footer }) {
  const { apprInfo } = useSelector((state) => state.approvalInfo);
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
  const footerOption = footer
    ? [
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
        {apprInfo && apprInfo.splApprId && <>{apprInfo.splApprId}</>}
        {}
        {}
      </Modal>
    </>
  );
}
