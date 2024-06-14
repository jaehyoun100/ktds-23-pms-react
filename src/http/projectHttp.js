const url =
  "http://" +
  (window.location.host === "43.202.29.221"
    ? "43.202.29.221"
    : "localhost:8080");

// 프로젝트 id 통해 해당 프로젝트 가져오는 API
export const getPrjApi = async (token, projectId) => {
  const response = await fetch(`${url}/api/project/view/${projectId}`, {
    headers: { Authorization: token },
    method: "GET",
  });

  const json = await response.json();
  console.log(json);

  return json.body;
};

// 프로젝트 id 통해 해당 프로젝트의 캘린더 일정 정보 가져오는 API
export const getCalendarApi = async (token, projectId) => {
  const response = await fetch(`${url}/api/project/calendar/${projectId}`, {
    headers: { Authorization: token },
    method: "GET",
  });
  const json = await response.json();
  return json.body;
};

// 캘린더 메모 생성
export const postMemo = async (date, memo, projectId, token) => {
  await fetch("http://localhost:8080/api/project/calendar", {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    method: "POST",
    body: JSON.stringify({
      clndDate: date,
      clndContent: memo,
      prjId: projectId,
    }),
  });
};

// 캘린더 메모 수정
export const putMemo = async (date, memo, projectId, token) => {
  await fetch("http://localhost:8080/api/project/calendar", {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    method: "PUT",
    body: JSON.stringify({
      clndDate: date,
      clndContent: memo,
      prjId: projectId,
    }),
  });
};

// deptId 통해 해당 부서에 속한 사원 정보 가져오는 API
export const getEmp = async (deptId, token, setMemberList) => {
  if (deptId) {
    const response = await fetch(
      `http://localhost:8080/api/project/employee/findbydeptid/${deptId}`,
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        method: "GET",
      }
    );
    const json = await response.json();
    const members = json.body?.map((emp) => ({
      label: emp.empName,
      value: emp.empId,
    }));
    setMemberList(members);
  }
};

// empId 통해 사원 상세 정보 가져오는 API
export const getEmpData = async (empId, token) => {
  const response = await fetch(
    `http://localhost:8080/api/v1/employee/view/${empId}`,
    {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  );
  const json = await response.json();
  return json;
};

export const putClientData = async (
  newTitle,
  newContact,
  newContent,
  token,
  project
) => {
  await fetch("http://localhost:8080/api/project/client", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      clntName: newTitle,
      cntct: newContact,
      info: newContent,
      clntId: project.clientVO.clntId,
    }),
  });
};
