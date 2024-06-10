import { updateKnowledge } from "../../http/KnowledgeHttp";
import { useRef } from "react";

export default function KnowUpate({knowledgeBody, setNeedReload, setIsUpdateMode, token}){
    
    const subjectRef = useRef();
    const fileRef = useRef();
    const contentRef = useRef();

    const fileName=knowledgeBody.fileName;
    // 취소
    const onCancelClickHandler = () => {
        setIsUpdateMode(false);
    };

    // 등록
    const onSaveClickHandler = () =>{
      const subject = subjectRef.current.value;
      const content = contentRef.current.value;

      let fileName;
      if (fileRef.current && fileRef.current.files[0]) {
        fileName = fileRef.current.files[0].name; // 파일 이름만 추출
      } else {
        fileName = knowledgeBody.name; // 기존 파일 이름 사용
      }
      
      const json= updateKnowledge(subject, fileName, content, knowledgeBody.knlId, token);
      console.log(json);

      if(json.errors){
        json.errors.forEach((error) => {
          alert(error);
        });
      }
      else if(json.body){
        setIsUpdateMode(false);
        setNeedReload(Math.random());
      }
    }

    return (<div>
        <div>
          <label htmlFor="subject">지식제목</label>
          <input type="text" id="subject" ref={subjectRef}  defaultValue={knowledgeBody.knlTtl}/>
        </div>
        <div>
          <label htmlFor="file">첨부파일 {knowledgeBody.fileName}</label>
          <input type="file" id="file" ref={fileRef} />
        </div>
        <div>
          <label htmlFor="content">지식 내용</label>
          <textarea id="content"  ref={contentRef} defaultValue={knowledgeBody.knlCntnt}></textarea>
        </div>
        <div className="button-area right-align">
          <button onClick={onCancelClickHandler}>취소</button>
          <button onClick={onSaveClickHandler}>등록</button>
        </div>
      </div>)
}