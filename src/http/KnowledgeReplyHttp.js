const url =
  "http://" +
  (window.location.host === "43.202.29.221"
    ? "43.202.29.221"
    : "localhost:8080");

// 댓글 리스트
export const loadKnowledgeReply = async ({ pPostId, token, pageNo = 0 }) => {
  if (!token) {
    return undefined;
  }

  const response = await fetch(`${url}/api/v1/reply/${pPostId}`, {
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
  formData.append("rplCntnt", content);

  const response = await fetch(`${url}/api/v1/knowledge/reply/${pPostId}`, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: formData,
  });
  const json = await response.json();
  return json;
};

// 지식댓글 삭제
export const deleteKnowledgeReply = async (rpId, token) => {
  const response = await fetch(`${url}/api/v1/knowledge/reply/delete/${rpId}`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });

  const json = await response.json();
  return json;
};

// 지식 관리 댓글 수정
export const updateKnowledgeReply = async (rplCntnt, rpId, token) => {
  const formData = new FormData();
  formData.append("rplCntnt", rplCntnt);

  const response = await fetch(`${url}/api/v1/knowledge/reply/modify/${rpId}`, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: formData,
  });
  const json = await response.json();
  return json;
};

// 1사원 1추천
export const replyRecommand = async (knlId, token) => {
  console.log("knlId1" + knlId);
  const response = await fetch(
    `${url}/api/v1/knowledge/reply/recommand/${knlId}`,
    {
      method: "POST",
      headers: { Authorization: token },
    }
  );
  const json = await response.json();
  return json;
};

// 재댓글 list
export const loadKnowledgereReply = async (knlId, token) => {
  if (!token) {
    return undefined;
  }

  const response = await fetch(`${url}/api/v1/reReply/${knlId}`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });

  const json = await response.json();

  return json;
};

// 재댓글 insert
export const createNewreReply = async (pPostId, rplId, content, token) => {
  const formData = new FormData();
  formData.append("rplCntnt", content);
  formData.append("pPostId", pPostId);
  formData.append("rplId", rplId);

  const response = await fetch(
    `${url}/api/v1/knowledge/rereply/pPostId=${pPostId}&rplId=${rplId}`,
    {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: formData,
    }
  );
  const json = await response.json();
  return json;
};
