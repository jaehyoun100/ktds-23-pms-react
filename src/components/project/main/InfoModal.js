import React, { useState } from "react";
import styles from "../project.module.css";
import TextInput from "../../common/input/TextInput";

const InfoModal = React.memo(
  ({ content, onClose, show, cancelContent, contact, title, onSave }) => {
    // 초기 값으로 현재 데이터를 사용하여 상태 관리
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(title);
    const [editContact, setEditContact] = useState(contact);
    const [editContent, setEditContent] = useState(content);

    // 편집 모드 활성화 함수
    const handleEdit = () => {
      setIsEditing(true);
    };

    // 저장 처리 함수
    const handleSave = () => {
      // onSave 콜백으로 변경 사항 전달
      onSave(editTitle, editContact, editContent);
      // 저장 후 편집 모드 해제
      setIsEditing(false);
    };

    // 편집 취소 함수
    const handleCancel = () => {
      // 수정 취소 시, 기존 데이터를 복구하고 편집 모드 해제
      setEditTitle(title);
      setEditContact(contact);
      setEditContent(content);
      setIsEditing(false);
    };

    // 모달이 표시되지 않으면 null 반환
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
            <div className={styles.modalTitleText}>
              고객사명 :{" "}
              {isEditing ? (
                <TextInput
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
              ) : (
                title
              )}
            </div>
          </div>
          <div className={styles.modalContact}>
            <div className={styles.modalContactText}>
              고객 연락처 :{" "}
              {isEditing ? (
                <TextInput
                  value={editContact}
                  onChange={(e) => setEditContact(e.target.value)}
                />
              ) : (
                contact
              )}
            </div>
          </div>
          <div className={styles.modalContent}>
            <div className={styles.modalText}>
              고객 정보 :{" "}
              {isEditing ? (
                <textarea
                  className={styles.modalTextAreaInfo}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
              ) : (
                content
              )}
            </div>
          </div>
          <div className={styles.inputSpace}>
            {isEditing ? (
              <>
                <button className={styles.button} onClick={handleSave}>
                  저장
                </button>
                <button className={styles.button} onClick={handleCancel}>
                  취소
                </button>
              </>
            ) : (
              <>
                <button className={styles.button} onClick={handleEdit}>
                  수정
                </button>
                <button className={styles.button} onClick={onClose}>
                  {cancelContent}
                </button>
              </>
            )}
          </div>
        </div>
      </dialog>
    );
  }
);

export default InfoModal;
