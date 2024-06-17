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

  const fileName = knowledgeBody.fileName;
  // 취소
  const onCancelClickHandler = () => {
    setIsUpdateMode(false);
  };

  // 등록
  const onSaveClickHandler = async () => {
    const subject = subjectRef.current.value;
    const content = contentRef.current.value;

    let fileName;
    if (fileRef.current && fileRef.current.files[0]) {
      fileName = fileRef.current.files[0].name; // 파일 이름만 추출
    } else {
      fileName = knowledgeBody.name; // 기존 파일 이름 사용
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
      alert("등록이 완료되었습니다");
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
          <label htmlFor="file">첨부파일: {knowledgeBody.fileName}</label>
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
