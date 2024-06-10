// 댓글 리스트
export const loadKnowledgeReply = async({ pPostId, token, pageNo = 0}) =>{
      if(!token){
          return undefined;
      }

      const response = await fetch(`http://localhost:8080/api/v1/reply/${pPostId}`, {
          method: "GET",
          headers: {
            Authorization: token,
          },
      });
        
      const json = await response.json();
      
      return json;
};

// 지식댓글 insert
export const createNewKnowledgeReply = async (content, pPostId, token) => {

  const formData = new FormData();
  formData.append("rplCntnt",content);

  const response =await fetch(
    `http://localhost:8080/api/v1/knowledge/reply/${pPostId}`,
    {
      method:"POST",
      headers:{
        Authorization: token,
      },
      body: formData,
    }
  );
  const json = await response.json();
  return json;
}

// 지식댓글 삭제
export const deleteKnowledgeReply = async(rpId, token) =>{
  console.log(rpId);
  console.log(token);
  const response=await fetch(
    `http://localhost:8080/api/v1/knowledge/reply/delete/${rpId}`,
    {
      method:"GET",
      headers:{
        Authorization: token,
      }
    }
  );
  
  const json = await response.json();
  return json;
}

// 지식 관리 댓글 수정
export const updateKnowledgeReply =async(rplCntnt, rpId, token) =>{
  const formData = new FormData();
  formData.append("rplCntnt", rplCntnt);

  const response=await fetch(
    `http://localhost:8080/api/v1/knowledge/reply/modify/${rpId}`,
    {
      method:"POST",
      headers:{
        Authorization: token
      },
      body:formData,
    }
  )
  const json = await response.json();
  return json;
}


