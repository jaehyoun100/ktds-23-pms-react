import React from "react";
import s from "../project.module.css";

const ProfileModal = React.memo(
  ({ content, profileValue, onClose, show, closeContent }) => {
    if (!show) {
      return null;
    }

    return (
      <dialog
        open
        className={s.modalWindow}
        role="alertdialog"
        aria-modal="true"
      >
        <div className={s.gridModal}>
          <div
            className={s.modalClose}
            onClick={onClose}
            role="button"
            aria-label="Close modal"
            style={{ cursor: "pointer" }}
          >
            X
          </div>
          <div className={s.modalContent}>
            <div className={s.modalProfile}>{content}</div>
            <div className={s.modalText}>{content}</div>
          </div>
          <div className={s.inputSpace}>
            <button
              className={`${s.confirmButton} ${s.button}`}
              onClick={onClose}
            >
              {closeContent}
            </button>
          </div>
        </div>
      </dialog>
    );
  }
);

export default ProfileModal;
