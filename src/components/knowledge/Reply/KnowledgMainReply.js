import { useEffect, useState, useRef } from "react";
import { loadKnowledgeReply, updateKnowledgeReply } from "../../../http/KnowledgeReplyHttp";
import KnowledgeReplyWrite from "./knowReplywrite";
import { deleteKnowledgeReply } from "../../../http/KnowledgeReplyHttp";

export default function KnowledgeMainReply(  { pPostId, token, setSelectedSplId, setNeedReload },  needReload ){
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);   
    const [replies, setReplies] = useState([]); // 댓글 데이터 상태 변수
    const [selectedReplies, setSelectedReplies] = useState([]); // State to store selected reply IDs
    const [isEditing, setIsEditing] = useState({}); // Object to store edit state for each comment
    const contentref = useRef();

    
    const canEditOrDelete = (replyItem, userId) => {
      // Check if the current user (identified by userId) is the creator (crtrId) of the comment
      return replyItem.crtrId === userId;
    };

    // 댓글 번호 출력
    const handleCheckboxChange = (event) => {
      const rplId = event.target.value;
      const isChecked = event.target.checked;

      if (isChecked) {
        setSelectedReplies([...selectedReplies, rplId]);
      } else {
        setSelectedReplies(selectedReplies.filter((id) => id !== rplId));
      }
      
    };

    //  댓글 번호 출력 후 삭제 진행
    const deleteKnowledgeReplyClickHandler =async() =>{
      if (selectedReplies.length === 0) {
        // Handle no replies selected case (e.g., display an alert)
       alert("체크박스를 선택 입력하세요");
       
      }
      else{
      
        //obect를 String으로 변환
        const str = selectedReplies.toString();
        const json=await deleteKnowledgeReply(str, token);

        if (json.errors) {
          json.errors.forEach((error) => {
            alert(error);
          });
        }else{
          alert("삭제에 성공하였습니다");
          setSelectedSplId(undefined);
          setNeedReload(Math.random());
        }
        
      }
    }
    const handleEditComment = async(e, replyItem) =>{
      e.preventDefault();
      if (selectedReplies.length === 0) {
        // Handle no replies selected case (e.g., display an alert)
       alert("체크박스를 선택 입력하세요");
       
      }
      
      const content = contentref.current.value;
      const str = selectedReplies.toString();
      
      const json=await updateKnowledgeReply(content, str, token);

      if (json.errors) {
        alert("수정에 실패해습니다");
      }
      else if(json.body){
        alert("수정이 완료되었습니다");
        setSelectedSplId(undefined);
        setNeedReload(Math.random());
      }

    }
    
    

    useEffect(() => {
        // You can now use the `token` prop here
        console.log("Token:", token);
        console.log("pPostId:", pPostId);
        const fetchData = async () => {
            setIsLoading(true);
            const data = await loadKnowledgeReply({ pPostId, token });
            setData(data);
            setIsLoading(false);
          };
        
     fetchData();
    }, [pPostId, token]);

    const { body: knowledgeReplyBody } = data || {};
    
    return(<>
       
        {token && (
            <div>
                <KnowledgeReplyWrite pPostId={pPostId}  token={token} setSelectedSplId={setSelectedSplId} setNeedReload={setNeedReload}/>
                {knowledgeReplyBody  && knowledgeReplyBody.map((replyItem)=>(
                  <tr key={replyItem.rplId}>
                      <input
                        type="checkbox"
                        name="selectedReplies"
                        value={replyItem.rplId}
                        onChange={handleCheckboxChange}
                      />
                    <td>
                      {replyItem.rplCntnt}
                      {replyItem.crtrId}
                      {replyItem.crtDt}
                      <button onClick={deleteKnowledgeReplyClickHandler}>삭제</button>
                      <button onClick={() => setIsEditing({ ...isEditing, [replyItem.rplId]: true })}>
                        수정
                      </button>
                    </td>
                    <td>
                        {isEditing[replyItem.rplId] && (
                        <td>
                          <form onSubmit={(e) => handleEditComment(e, replyItem)}>
                            <input
                              type="text"
                              defaultValue={replyItem.rplCntnt} // Pre-fill with existing content
                              ref={contentref}
                            />
                            <button type="submit">저장</button>
                          </form>
                        </td>
                      )}
                    </td>
                  </tr>
                  
                ))}
                
                      
            </div>
            
           
        )}
        
        
       
    </>)

    
    
}