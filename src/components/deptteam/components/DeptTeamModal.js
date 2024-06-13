import React from "react";
import s from "./deptteammodal.module.css"; // 모달 CSS를 추가합니다.
import { BsX } from "react-icons/bs";

const DeptTeamModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={s.modalOverlay}>
      <div className={s.modalContent}>
        <BsX onClick={onClose} className={s.closeButton} />

        {children}
      </div>
    </div>
  );
};

export default DeptTeamModal;
