const url =
  "http://" +
  (window.location.host === "43.202.29.221"
    ? "43.202.29.221"
    : "localhost:8080");

//이슈 리스트
export const loadIssueList = async ({ token, pageNo = 0 }) => {
  if (!token) {
    return undefined;
  }
  const response = await fetch(
    `http://localhost:8080/api/v1/issue?pageNo=${pageNo}`,
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

//이슈 불러오기
export const loadIssue = async (token, rqmId) => {
  if (!token) {
    return undefined;
  }
  const response = await fetch(`${url}/api/v1/issue/search/${rqmId}`, {
    method: "GET",
    headers: { Authorization: token },
  });
  const json = await response.json();

  return json;
};

export const loadOneIssue = async ({ token, rqmId, isId }) => {
  const response = await fetch(
    `${url}/api/v1/issue/view?&rqmId${rqmId}&isId${isId}`,
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

export const writeIssue = async (token, fromData) => {
  if (!token) {
    return undefined;
  }
  const response = await fetch(`$(url)/api/v1/issue/write`, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: FormData,
  });

  const json = await response.json();

  return json;
};

export const deleteIssue = async (isId, token) => {
  const response = await fetch(
    `http://localhost:8080/api/v1/knowledge/delete/${isId}`,
    {
      method: "GET",
      headers: { Authorization: token },
    }
  );

  const json = await response.json();
  return json;
};
