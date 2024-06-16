import { useState } from "react";

const url =
  "http://" +
  (window.location.host === "43.202.29.221"
    ? "43.202.29.221"
    : "localhost:8080");

// 보관쪽지 전체 검색
export const loadSaveMemos = async ({ token, pageNo = 0 }) => {
  if (!token) {
    return;
  }
  // 발신
  const sendResponse = await fetch(
    `${url}/api/memo/send/save?pageNo=${pageNo}`,
    {
      method: "GET",
      headers: {
        Authorization: token,
      },
    }
  );
  const sendJson = await sendResponse.json();

  // 수신
  const rcvResponse = await fetch(
    `${url}/api/memo/receive/save?pageNo=${pageNo}`,
    {
      method: "GET",
      headers: { Authorization: token },
    }
  );
  const rcvJson = await rcvResponse.json();

  const json = { sendJson, rcvJson };
  return json;
};

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

// 보관 발신쪽지 목록 조회
export const loadSaveSendMemos = async ({ token, pageNo = 0 }) => {
  if (!token) {
    return;
  }
  const response = await fetch(`${url}/api/memo/send/save?pageNo=${pageNo}`, {
    method: "GET",
    headers: { Authorization: token },
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
export const sendMemo = async (
  token,
  memoTtl,
  memoCntnt,
  file,
  receiveMemoVO
) => {
  if (!token) {
    return;
  }

  const filename = file === undefined ? null : file;
  const formData = new FormData();
  formData.append("memoTtl", memoTtl);
  formData.append("memoCntnt", memoCntnt);
  formData.append("file", filename);

  for (const memoVO in receiveMemoVO) {
    formData.append("receiveInfoList", receiveMemoVO[memoVO]);
  }

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

// 보관 수신쪽지 목록 조회
export const loadSaveReceiveMemos = async ({ token, pageNo = 0 }) => {
  if (!token) {
    return;
  }
  const response = await fetch(
    `${url}/api/memo/receive/save?pageNo=${pageNo}`,
    {
      method: "GET",
      headers: { Authorization: token },
    }
  );
  const json = await response.json();
  return json;
};

// 수신 쪽지 상세 조회
export const loadReceiveMemo = async ({ selectRcvMemoId, token }) => {
  console.log("????");
  if (!token) {
    return;
  }
  const response = await fetch(`${url}/api/memo/receive/${selectRcvMemoId}`, {
    method: "GET",
    headers: { Authorization: token },
  });
  const rcvJson = await response.json();
  const sendMemoId = rcvJson.body.sendMemoId;
  console.log("ooo ", rcvJson);

  if (!sendMemoId) {
    console.log("데이터를 불러오지 못했습니다.");
    return;
  }

  const sendResponse = await fetch(`${url}/api/memo/send/${sendMemoId}`, {
    method: "GET",
    headers: { Authorization: token },
  });
  const sendJson = await sendResponse.json();
  console.log("ooo ", sendJson);

  const json = { rcvJson, sendJson };
  console.log("::::: ", json);

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

// 수신 쪽지 읽음
export const readReceiveMemo = async (token, selectRcvMemoId) => {
  if (!token) {
    return;
  }
  const response = await fetch(
    `${url}/api/memo/receive/read/${selectRcvMemoId}`,
    {
      method: "PUT",
      headers: { Authorization: token, "Content-Type": "application/json" },
    }
  );
  const json = await response.json();
  return json;
};

// 파일 다운로드
export const onDownloadFile = async (token, selectRcvMemoId) => {
  if (!token) {
    return;
  }
  const response = await fetch(
    `${url}/api/memo/receive/downloadFile/${selectRcvMemoId}`,
    {
      method: "GET",
      headers: { Authorization: token },
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

// ================== 사원 조회 ==================

// 로그인한 사원 정보 조회
export const loadMyData = async ({ token }) => {
  // token : fetch에서 객체로 전달 -> 구조분해 필요
  // 유저 정보
  const response = await fetch(`${url}/api/`, {
    method: "GET",
    headers: { Authorization: token },
  });

  const json = await response.json();
  return json;
};

// 주소록 부서원 조회
export const loadDepartmentMemberList = async ({ token, selectedDeptId }) => {
  if (!token) {
    return;
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
