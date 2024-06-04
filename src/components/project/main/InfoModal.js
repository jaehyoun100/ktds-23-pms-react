import React from "react";
import styles from "../project.module.css";

const InfoModal = React.memo(
  ({ content, onClose, show, cancelContent, contact, title }) => {
    if (!show) {
      return null;
    }

    return (
      <dialog
        open
        className={styles.modalWindow}
        role="alertdialog"
        aria-modal="true"
        style={{ zIndex: 2 }}
      >
        <div className={styles.gridModal}>
          <div
            className={styles.modalClose}
            onClick={onClose}
            role="button"
            aria-label="Close modal"
            style={{ cursor: "pointer" }}
          >
            X
          </div>

          <div className={styles.modalTitle}>
            <div className={styles.modalTitleText}>고객사명 : {title}</div>
          </div>
          <div className={styles.modalContact}>
            <div className={styles.modalContactText}>
              고객 연락처 : {contact}
            </div>
          </div>
          <div className={styles.modalContent}>
            <div className={styles.modalText}>{content}</div>
          </div>
          <div className={styles.inputSpace}>
            <button className={styles.button} onClick={onClose}>
              {cancelContent}
            </button>
          </div>
        </div>
      </dialog>
    );
  }
);
export default InfoModal;
