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

  //등록
  const onSaveClickHandler = async () => {
    const subject = subjectRef.current.value;
    const file = fileRef.current.files[0];

    if (!file) {
      alert("사진을 선택하세요");
      return;
    }

    const content = contentRef.current.value;
    const fileName = file.name;

    if (!subject || !content) {
      alert("내용 또는 제목을 입력하세요");
      return;
    }

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
          <button onClick={onCancelClickHandler} type="button">
            취소
          </button>
          <button onClick={onSaveClickHandler} type="button">
            등록
          </button>
        </div>
      </div>
    </div>
  );
}
