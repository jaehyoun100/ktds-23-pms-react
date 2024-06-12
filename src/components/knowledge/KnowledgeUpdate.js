import { updateKnowledge } from "../../http/KnowledgeHttp";
import { useRef } from "react";
import "./Knowledge.css";

export default function KnowUpate({
  knowledgeBody,
  setNeedReload,
  setIsUpdateMode,
  token,
}) {
  console.log("setIsUpdateMode;" + setIsUpdateMode);
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
    console.log(json);

    if (json.errors) {
      json.errors.forEach((error) => {
        alert(error);
      });
    } else if (json.body) {
      setIsUpdateMode(false);
      setNeedReload(Math.random());
    }
  };

  return (
    <div className="App">
      <div className="knowledge-form">
        <div className="knowledge-form-field">
          <label className="knowledge-form-label">제목</label>
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
        <div className="knowledge-form-field">
          <label className="knowledge-form-label">내용</label>
          <textarea
            className="knowledge-form-textarea"
            ref={contentRef}
            defaultValue={knowledgeBody.knlCntnt}
          ></textarea>
        </div>
        <div className="knowledge-form-button-area">
          <button
            className="knowledge-form-button"
            onClick={onSaveClickHandler}
          >
            등록
          </button>
          <button
            className="knowledge-form-button"
            onClick={onCancelClickHandler}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
