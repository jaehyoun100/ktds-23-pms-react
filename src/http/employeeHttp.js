import { Modal, message } from "antd";

const url = "http://43.202.29.221";

export const loadData = async ({ token }) => {
  if (!token) {
    return undefined;
  }
  const response = await fetch(`${url}/api/v1/employees`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });
  const json = await response.json();

  return json;
};

export const loadOneData = async ({ token, empId }) => {
  const response = await fetch(`${url}/api/v1/employee/${empId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  const json = await response.json();

  return json;
};

// 수정
export const handleUpdateEmployee = async ({ data, token, empId }) => {
  const response = await fetch(`${url}/api/v1/employee/modify/${empId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  });
  if (response.status === 200) {
    loadOneData({ token, empId });
  }
};

// 비밀번호 변경
export const handleUpdateEmployeePwd = async ({ data, token, empId }) => {
  const response = await fetch(`${url}/api/v1/employee/modifyPwd/${empId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  });
  if (response.status === 200) {
    loadOneData({ token, empId });
  }
};

export const handleRegistEmployee = async ({ data, token }) => {
  const response = await fetch(`${url}/api/v1/employee`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  });
  if (response.status === 200) {
    Modal.info({
      title: "등록 성공",
      content: "초기 비밀번호는 'ABCDE12345!' 입니다.",
    });
    loadData({ token });
  }

  if (response.errors) {
    Object.entries(response.errors).map(([_, msg]) => {
      message.warning(msg);
    });
  }
};
