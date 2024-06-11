import React, { useEffect, useRef, useState } from "react";
import styles from "../project.module.css";
import TextInput from "../../common/input/TextInput";

const InfoModal = React.memo(
  ({
    onClose,
    show,
    cancelContent,

    onSave,
    clientData,
  }) => {
    // 초기 값으로 현재 데이터를 사용하여 상태 관리
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(clientData.clntName);
    const [editContact, setEditContact] = useState(clientData.cntct);
    const [editContent, setEditContent] = useState(clientData.info);
    const titleRef = useRef(clientData.clntName);
    const contactRef = useRef(clientData.cntct);
    const [canSave, setCanSave] = useState(true);
    useEffect(() => {
      if (titleRef.current && titleRef.current.value === "") {
        setCanSave(false);
        return;
      }
      if (
        titleRef.current &&
        titleRef.current.value &&
        titleRef.current.value.length > 30
      ) {
        setCanSave(false);
        return;
      }
      if (
        contactRef.current &&
        contactRef.current.value &&
        contactRef.current.value.length > 15
      ) {
        setCanSave(false);
        return;
      }

      if (contactRef.current && contactRef.current.value === "") {
        setCanSave(false);
        return;
      }
      if (
        contactRef.current &&
        contactRef.current.value &&
        isNaN(contactRef.current.value.replaceAll("-", ""))
      ) {
        setCanSave(false);
        return;
      }
      if (
        contactRef.current &&
        contactRef.current.value &&
        contactRef.current.value.split("-").length > 3
      ) {
        setCanSave(false);
        return;
      }
      setCanSave(true);
    }, [titleRef.current?.value, contactRef.current?.value]);

    // 편집 모드 활성화 함수
    const handleEdit = () => {
      setIsEditing(true);
    };

    // 저장 처리 함수
    const handleSave = () => {
      if (!canSave) {
        alert("형식에 맞춰 재입력 후 저장해주세요.");
        return;
      }
      // onSave 콜백으로 변경 사항 전달
      onSave(editTitle, editContact, editContent);
      // 저장 후 편집 모드 해제
      setIsEditing(false);
    };

    // 편집 취소 함수
    const handleCancel = () => {
      // 수정 취소 시, 기존 데이터를 복구하고 편집 모드 해제
      setEditTitle(clientData.clntName);
      setEditContact(clientData.cntct);
      setEditContent(clientData.info);
      setIsEditing(false);
      // titleRef.current.value = clientData.clntName;
      // contactRef.current.value = clientData.cntct;
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
                  onChangeHandler={(e) => setEditTitle(e.target.value)}
                  ref={titleRef}
                />
              ) : (
                editTitle
              )}
              {isEditing &&
              titleRef.current &&
              (titleRef.current.value === null ||
                titleRef.current.value === "") ? (
                <span className={styles.alertMessage}>
                  ※ 고객사명 필수 값입니다.
                </span>
              ) : (
                <></>
              )}
              {isEditing &&
              titleRef.current &&
              titleRef.current.value &&
              titleRef.current.value.length > 30 ? (
                <span className={styles.alertMessage}>
                  ※ 고객사명은 30자를 초과할 수 없습니다.
                </span>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className={styles.modalContact}>
            <div className={styles.modalContactText}>
              고객 연락처 :{" "}
              {isEditing ? (
                <TextInput
                  value={editContact}
                  onChangeHandler={(e) => setEditContact(e.target.value)}
                  ref={contactRef}
                />
              ) : (
                editContact
              )}
              {isEditing &&
              contactRef.current &&
              (contactRef.current.value === null ||
                contactRef.current.value === "") ? (
                <span className={styles.alertMessage}>
                  ※ 연락처는 필수 값입니다.
                </span>
              ) : (
                <></>
              )}
              {isEditing &&
              contactRef.current &&
              contactRef.current.value &&
              contactRef.current.value.length > 15 ? (
                <span className={styles.alertMessage}>
                  ※ 연락처는 15자를 초과할 수 없습니다.
                </span>
              ) : (
                <></>
              )}
              {isEditing &&
              contactRef.current &&
              contactRef.current.value &&
              isNaN(contactRef.current.value.replaceAll("-", "")) ? (
                <span className={styles.alertMessage}>
                  ※ 문자열을 입력할 수 없습니다.
                </span>
              ) : (
                <></>
              )}
              {isEditing &&
              contactRef.current &&
              contactRef.current.value &&
              contactRef.current.value.split("-").length > 3 ? (
                <span className={styles.alertMessage}>
                  ※ '-' 문자는 연락처 구분에만 사용 가능합니다.
                </span>
              ) : (
                <></>
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
                editContent
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
