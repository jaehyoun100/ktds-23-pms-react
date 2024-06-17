import { useRef } from "react";
import { createNewBoard } from "../../http/KnowledgeHttp";
import styles from "./Knowledge.module.css";

export default function KnowledgeCreate({
  setIsCreateMode,
  setNeedReload,
  token,
}) {
  const subjectRef = useRef();
  const fileRef = useRef();
  const contentRef = useRef();

  //취소
  const onCancelClickHandler = () => {
    setIsCreateMode(false);
  };

  // Save button click handler
  const onSaveClickHandler = async () => {
    const subject = subjectRef.current.value;
    const file = fileRef.current.files[0]; // Get the selected file if any
    const content = contentRef.current.value;

    if (!subject || !content) {
      alert("Please enter a title and content.");
      return;
    }

    const fileName = file ? file.name : ""; // Use filename if file is selected, otherwise empty string
    const json = await createNewBoard(subject, fileName, content, token);
    console.log(json);

    if (json.errors) {
      json.errors.forEach((error) => {
        alert(error);
      });
    } else if (json.body) {
      setIsCreateMode(false);
      setNeedReload(Math.random());
    }
  };

  return (
    <div className={styles.App}>
      <div className={styles.knowledgeform}>
        <div className={styles.knowledgeformfield}>
          <label htmlFor="subject" className={styles.knowledgeformlabel}>
            지식제목
          </label>
          <input
            type="text"
            id="subject"
            ref={subjectRef}
            className={styles.knowledgeforminput}
          />
        </div>
        <div className={styles.knowledgeformfield}>
          <label htmlFor="file" className={styles.knowledgeformlabel}>
            첨부파일
          </label>
          <input
            type="file"
            id="file"
            ref={fileRef}
            className={styles.knowledgeforminput}
          />
        </div>
        <div className={styles.knowledgeformfield}>
          <label htmlFor="content" className={styles.knowledgeformlabel}>
            지식 내용
          </label>
          <textarea
            id="content"
            ref={contentRef}
            className={styles.knowledgeformtextarea}
          ></textarea>
        </div>
        <div className={styles.knowledgeformbuttonarea}>
          <button
            onClick={onCancelClickHandler}
            className={styles.knowledgeformbutton}
          >
            취소
          </button>
          <button
            onClick={onSaveClickHandler}
            className={styles.knowledgeformbutton}
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
}
