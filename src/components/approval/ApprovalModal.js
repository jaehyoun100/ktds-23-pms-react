import { Button, Modal } from "antd";
import Spacer from "../employee/components/Spacer";

export default function ApprovalModal({ open, setOpen }) {
  const onApprHandler = () => {
    setOpen(false);
  };
  const onRefuseHandler = () => {
    setOpen(false);
  };
  const onCancelHandelr = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        open={open}
        onCancel={onCancelHandelr} //x버튼 클릭
        footer={[
          <Button key="apprBtn" onClick={onApprHandler}>
            승인
          </Button>,
          <Spacer key="forMargin" margin={5} />,
          <Button key="refuseBtn" onClick={onRefuseHandler}>
            거절
          </Button>,
        ]}
      >
        {/* 정보 가져오기 */}
        정보가 이렇게 있음
      </Modal>
    </>
  );
}
