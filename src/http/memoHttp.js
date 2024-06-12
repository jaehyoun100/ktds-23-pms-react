const url =
  "http://" +
  (window.location.host === "43.202.29.221"
    ? "43.202.29.221"
    : "localhost:8080");

// ================== Send Memo ==================
// 발신 쪽지 목록 조회
export const loadSendMemos = async ({ token, pageNo = 0 }) => {
  if (!token) {
    return;
  }
  const response = await fetch(`${url}/api/memo/send?pageNo=${pageNo}`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });
  const json = await response.json();
  return json;
};

// 발신 쪽지 상세 조회
export const loadSendMemo = async ({ token, selectSendMemoId }) => {
  if (!token) {
    return;
  }
  const response = await fetch(`${url}/api/memo/send/${selectSendMemoId}`, {
    method: "GET",
    headers: { Authorization: token },
  });
  const json = await response.json();
  return json;
};

// 쪽지 발송
export const writeMemo = async (token, rcvId, memoTtl, file, memoCntnt) => {
  const formData = new FormData();
  formData.append("rcvId", rcvId);
  formData.append("memoTtl", memoTtl);
  formData.append("memoCntnt", memoCntnt);
  formData.append("file", file);

  const response = await fetch(`${url}/api/memo/send`, {
    method: "POST",
    headers: { Authorization: token },
    body: formData,
  });
  const json = await response.json();
  return json;
};

// 발신 취소
export const cancelSendMemo = async (token, selectSendMemoId) => {
  if (!token) {
    return;
  }
  const response = await fetch(
    `${url}/api/memo/send/cancel/${selectSendMemoId}`,
    {
      method: "PUT",
      headers: { Authorization: token, "Content-Type": "application/json" },
    }
  );
  const json = await response.json();
  return json;
};

// 발신 쪽지 보관
export const saveSendMemo = async (token, selectSendMemoId, newSaveState) => {
  if (!token) {
    return;
  }
  const response = await fetch(
    `${url}/api/memo/send/save/${selectSendMemoId}`,
    {
      method: "PUT",
      headers: { Authorization: token, "Content-Type": "application/json" },
      body: JSON.stringify({ sendSaveYn: newSaveState }),
    }
  );
  const json = await response.json();
  return json;
};

// 발신 쪽지 삭제
export const deleteSendMemo = async (token, selectSendMemoId) => {
  if (!token) {
    return;
  }
  const response = await fetch(`${url}/api/memo/send/${selectSendMemoId}`, {
    method: "DELETE",
    headers: { Authorization: token },
  });
  const json = await response.json();
  return json;
};

// ================== Receive Memo ==================
// 수신 쪽지 목록 조회
export const loadReceiveMemos = async ({ token, pageNo = 0 }) => {
  if (!token) {
    return;
  }
  const response = await fetch(`${url}/api/memo/receive?pageNo=${pageNo}`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });
  const json = await response.json();
  return json;
};

// 수신 쪽지 상세 조회
export const loadReceiveMemo = async ({ selectRcvMemoId, token }) => {
  if (!token) {
    return;
  }
  const response = await fetch(`${url}/api/memo/receive/${selectRcvMemoId}`, {
    method: "GET",
    headers: { Authorization: token },
  });
  const json = await response.json();
  return json;
};

// 수신 쪽지 보관
export const saveReceiveMemo = async (token, selectRcvMemoId, newSaveState) => {
  if (!token) {
    return;
  }
  const response = await fetch(
    `${url}/api/memo/receive/save/${selectRcvMemoId}`,
    {
      method: "PUT",
      headers: { Authorization: token, "Content-Type": "application/json" },
      body: JSON.stringify({ rcvSaveYn: newSaveState }),
    }
  );
  const json = await response.json();
  return json;
};

// 수신 쪽지 삭제
export const deleteReceiveMemo = async (token, selectRcvMemoId) => {
  if (!token) {
    return;
  }
  const response = await fetch(`${url}/api/memo/receive/${selectRcvMemoId}`, {
    method: "DELETE",
    headers: { Authorization: token },
  });
  const json = await response.json();
  return json;
};

// ================== 주소록 ==================
export const loadDepartmentMemberList = async ({ token, selectedDeptId }) => {
  if (!token) {
    return undefined;
  }
  const response = await fetch(`${url}/api/memo/member/${selectedDeptId}`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });
  const json = await response.json();

  return json;
};
