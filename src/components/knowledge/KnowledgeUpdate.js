import { updateKnowledge } from "../../http/KnowledgeHttp";
import { useRef, useState } from "react";
import styles from "./Knowledge.module.css";

export default function KnowledgeUpdate({
  knowledgeBody,
  setNeedReload,
  setIsUpdateMode,
  token,
}) {
  const subjectRef = useRef();
  const fileRef = useRef();
  const contentRef = useRef();

  const fileName = knowledgeBody.fileName || ""; // Use existing filename or empty string

  // Cancel button click handler
  const onCancelClickHandler = () => {
    setIsUpdateMode(false);
  };

  // Save button click handler
  const onSaveClickHandler = async () => {
    const subject = subjectRef.current.value;
    const content = contentRef.current.value;

    let selectedFile = fileRef.current?.files?.[0]; // Optional chaining
    let fileName;

    if (selectedFile) {
      fileName = selectedFile.name;
    } else {
      fileName = knowledgeBody.fileName || ""; // Use existing filename or empty string
    }

    const json = await updateKnowledge(
      subject,
      fileName,
      content,
      knowledgeBody.knlId,
      token
    );

    if (json.errors) {
      json.errors.forEach((error) => {
        alert(error);
      });
    } else if (json.body) {
      alert("수정이 완료되었습니다");
      setIsUpdateMode(false);
      setNeedReload(Math.random());
    }
  };

  return (
    <div className={styles.App}>
      <div className={styles.knowledgeform}>
        <div className={styles.knowledgeformfield}>
          <label className={styles.knowledgeformlabel}>제목</label>
          <input
            type="text"
            id="subject"
            ref={subjectRef}
            defaultValue={knowledgeBody.knlTtl}
          />
        </div>
        <div>
          <label htmlFor="file">첨부파일: {fileName}</label>
          <input type="file" id="file" ref={fileRef} />
        </div>
        <div className={styles.knowledgeformfield}>
          <label className={styles.knowledgeformlabel}>내용</label>
          <textarea
            className={styles.knowledgeformtextarea}
            ref={contentRef}
            defaultValue={knowledgeBody.knlCntnt}
          ></textarea>
        </div>
        <div className={styles.knowledgeformbuttonarea}>
          <button type="button" onClick={onSaveClickHandler}>
            등록
          </button>
          <button type="button" onClick={onCancelClickHandler}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
