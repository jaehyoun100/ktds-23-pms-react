const url =
  "http://" +
  (window.location.host === "43.202.29.221"
    ? "43.202.29.221"
    : "localhost:8080");

// 리스트
export const loadknowledgeList = async ({ token, pageNo = 0 }) => {
  if (!token) {
    return undefined;
  }

  const response = await fetch(
    `${url}/api/v1/knowledge?pageNo=${pageNo}`,
    {
      method: "GET",
      headers: {
        Authorization: token,
      },
    }
  );

  const json = await response.json();

  return json;
};

// 지식관리 생성(insert)
export const createNewBoard = async (subject, file, content, token) => {
  const formData = new FormData();
  formData.append("knlTtl", subject);
  formData.append("knlCntnt", content);
  formData.append("fileName", file);

  const response = await fetch(
    `${url}/api/v1/knowledge/insert`,
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

// view(상세보기)
export const loadKnowledge = async ({ selectedSplId, token }) => {
  const response = await fetch(
    `${url}/api/v1/knowledge/${selectedSplId}`,
    {
      method: "GET",
      headers: { Authorization: token },
    }
  );

  const json = await response.json();
  return json;
};

// 수정
export const updateKnowledge = async (subject, file, content, knlId, token) => {
  console.log("knlId:" + knlId);

  const formData = new FormData();
  formData.append("knlTtl", subject);
  formData.append("knlCntnt", content);
  formData.append("fileName", file);

  const response = await fetch(
    `${url}/api/v1/knowledge/modify/${knlId}`,
    {
      method: "PUT",
      headers: {
        Authorization: token,
      },
      body: formData,
    }
  );

  const json = await response.json();
  return json;
};

//삭제
export const deleteKnowledge = async (knlId, token) => {
  const response = await fetch(
    `${url}/api/v1/knowledge/delete/${knlId}`,
    {
      method: "GET",
      headers: { Authorization: token },
    }
  );

  const json = await response.json();
  return json;
};

// 1사원 1추천
export const KnowledgeRecommand = async (knlId, token) => {
  const response = await fetch(
    `${url}/api/v1/knowledge/recommend/${knlId}`,
    {
      method: "POST",
      headers: { Authorization: token },
    }
  );
  const json = await response.json();
  return json;
};
