import { useRef } from "react";
import { createNewBoard } from "../../http/KnowledgeHttp";
import "./Knowledge.css";

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
    <div className="App">
      <div className="knowledge-form">
        <div className="knowledge-form-field">
          <label htmlFor="subject" className="knowledge-form-label">
            지식제목
          </label>
          <input
            type="text"
            id="subject"
            ref={subjectRef}
            className="knowledge-form-input"
          />
        </div>
        <div className="knowledge-form-field">
          <label htmlFor="file" className="knowledge-form-label">
            첨부파일
          </label>
          <input
            type="file"
            id="file"
            ref={fileRef}
            className="knowledge-form-input"
          />
        </div>
        <div className="knowledge-form-field">
          <label htmlFor="content" className="knowledge-form-label">
            지식 내용
          </label>
          <textarea
            id="content"
            ref={contentRef}
            className="knowledge-form-textarea"
          ></textarea>
        </div>
        <div className="knowledge-form-button-area">
          <button
            onClick={onCancelClickHandler}
            className="knowledge-form-button"
          >
            취소
          </button>
          <button
            onClick={onSaveClickHandler}
            className="knowledge-form-button"
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
}
