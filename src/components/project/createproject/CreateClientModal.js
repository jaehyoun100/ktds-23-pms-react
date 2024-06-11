import React, { useEffect, useState } from "react";
import styles from "../project.module.css";
import TextInput from "../../common/input/TextInput";

const CreateClientModal = React.memo(
  ({
    show,
    onClose,
    onConfirm,
    cancelContent,
    confirmContent,
    titleRef,
    cntctRef,
    memoRef,
    setCanSave,
  }) => {
    // 새롭게 추가: 렌더링 완료 여부를 추적하기 위한 상태
    const [isRendered, setIsRendered] = useState(false);
    const [editTitle, setEditTitle] = useState();
    const [editContact, setEditContact] = useState();

    // 렌더링 후 ref가 설정되었는지 확인하기 위해 useEffect 사용
    useEffect(() => {
      setIsRendered(true);
    }, []);

    // ref 값이 변경될 때마다 유효성 검사 수행
    useEffect(() => {
      if (!isRendered) return;

      // 고객사명 유효성 검사
      if (
        titleRef.current &&
        (titleRef.current.value === "" || titleRef.current.value.length > 30)
      ) {
        setCanSave(false);
        return;
      }

      // 연락처 유효성 검사
      if (
        cntctRef.current &&
        (cntctRef.current.value === "" ||
          cntctRef.current.value.length > 15 ||
          isNaN(cntctRef.current.value.replaceAll("-", "")) ||
          cntctRef.current.value.split("-").length > 3)
      ) {
        setCanSave(false);
        return;
      }

      setCanSave(true);
    }, [
      titleRef.current?.value,
      cntctRef.current?.value,
      isRendered,
      setCanSave,
      cntctRef,
      titleRef,
    ]);

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
            <TextInput
              ref={titleRef}
              onChangeHandler={(e) => setEditTitle(e.target.value)}
            />
            {titleRef.current &&
            titleRef.current.value &&
            titleRef.current.value.length > 30 ? (
              <span className={styles.alertMessage}>
                ※ 고객사명은 30자를 초과할 수 없습니다.
              </span>
            ) : (
              <></>
            )}
            {titleRef.current &&
            (titleRef.current.value === "" ||
              titleRef.current.value === null) ? (
              <span className={styles.alertMessage}>
                ※ 고객사명은 필수 입력사항입니다.
              </span>
            ) : (
              <></>
            )}
          </div>
          <div className={styles.modalContact}>
            <div className={styles.modalContactText}>고객 연락처 :</div>
            <TextInput
              ref={cntctRef}
              onChangeHandler={(e) => setEditContact(e.target.value)}
            />
            {cntctRef.current &&
            cntctRef.current.value &&
            cntctRef.current.value.length > 15 ? (
              <span className={styles.alertMessage}>
                ※ 연락처는 15자를 초과할 수 없습니다.
              </span>
            ) : (
              <></>
            )}
            {cntctRef.current &&
            cntctRef.current.value &&
            isNaN(cntctRef.current.value.replaceAll("-", "")) ? (
              <span className={styles.alertMessage}>
                ※ 문자열을 입력할 수 없습니다.
              </span>
            ) : (
              <></>
            )}
            {cntctRef.current &&
            cntctRef.current.value &&
            cntctRef.current.value.split("-").length > 3 ? (
              <span className={styles.alertMessage}>
                ※ '-' 문자는 연락처 구분에만 사용 가능합니다.
              </span>
            ) : (
              <></>
            )}
            {cntctRef.current && cntctRef.current.value === "" ? (
              <span className={styles.alertMessage}>
                ※ 연락처는 필수 입력사항입니다.
              </span>
            ) : (
              <></>
            )}
          </div>
          <div className={styles.modalClientContent}>
            <div className={styles.modalClientText}>고객 정보 :</div>
            <textarea className={styles.modalTextArea} ref={memoRef} />
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
