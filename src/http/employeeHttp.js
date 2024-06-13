import { message } from "antd";

const url =
  "http://" +
  (window.location.host === "43.202.29.221"
    ? "43.202.29.221"
    : "localhost:8080");

export const loadData = async ({ token }) => {
  if (!token) {
    return undefined;
  }
  const response = await fetch(`http://localhost:8080/api/v1/employees`, {
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
    loadData({ token });
  }

  if (response.errors) {
    Object.entries(response.errors).map(([_, msg]) => {
      message.warning(msg);
    });
  }
};
