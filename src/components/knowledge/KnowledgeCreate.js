import { useRef } from "react";
import { createNewBoard } from "../../http/KnowledgeHttp";

export default function KnowledgeCreate({ setIsCreateMode, setNeedReload, token }) {
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
    const content = contentRef.current.value;

    console.log("content:", content);
    const fileName = file.name;

    if (!subject || !content) {
      alert("제목 또는 내용을 입력하세요");
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
    <div>
      <div>
        <label htmlFor="subject">지식제목</label>
        <input type="text" id="subject" ref={subjectRef} />
      </div>
      <div>
        <label htmlFor="file">첨부파일</label>
        <input type="file" id="file" ref={fileRef} />
      </div>
      <div>
        <label htmlFor="content">지식 내용</label>
        <textarea id="content" ref={contentRef}></textarea>
      </div>
      <div className="button-area right-align">
        <button onClick={onCancelClickHandler}>취소</button>
        <button onClick={onSaveClickHandler}>등록</button>
      </div>
    </div>
  );
}
