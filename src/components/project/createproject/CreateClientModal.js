import React from "react";
import styles from "../project.module.css";
import TextInput from "../../common/input/TextInput";

const CreateClientModal = React.memo(
  ({ show, onClose, onConfirm, cancelContent, confirmContent }) => {
    if (!show) {
      return null;
    }

    return (
      <dialog
        open
        className={styles.clientModalWindow}
        role="alertdialog"
        aria-modal="true"
        style={{ zIndex: 2 }}
      >
        <div className={styles.gridModal}>
          <div
            className={styles.modalClose}
            onClick={onClose}
            role="button"
            aria-label="모달 닫기"
            style={{ cursor: "pointer" }}
          >
            X
          </div>

          <div className={styles.modalTitle}>
            <div className={styles.modalTitleText}>고객사명 :</div>
            <TextInput />
          </div>
          <div className={styles.modalContact}>
            <div className={styles.modalContactText}>고객 연락처 :</div>
            <TextInput />
          </div>
          <div className={styles.modalClientContent}>
            <div className={styles.modalClientText}>고객 정보 :</div>
            <textarea className={styles.modalTextArea} />
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.button} onClick={onConfirm}>
              {confirmContent}
            </button>
            <button className={styles.button} onClick={onClose}>
              {cancelContent}
            </button>
          </div>
        </div>
      </dialog>
    );
  }
);
export default CreateClientModal;
