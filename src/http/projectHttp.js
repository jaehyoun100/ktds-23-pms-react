import { useNavigate } from "react-router-dom";

const url = "http://43.202.29.221";

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
  await fetch(`${url}/api/project/calendar`, {
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
  await fetch(`${url}/api/project/calendar`, {
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
      `${url}/api/project/employee/findbydeptid/${deptId}`,
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
  const response = await fetch(`${url}/api/v1/employee/view/${empId}`, {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  const json = await response.json();
  return json;
};

// client 정보 수정 api
export const putClientData = async (
  newTitle,
  newContact,
  newContent,
  token,
  project
) => {
  await fetch(`${url}/api/project/client`, {
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

// 참여원 추가 api
export const addTmmate = async (token, project, willInsertData) => {
  const res = await fetch(`${url}/api/project/teammate/${project.prjId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(willInsertData),
  });
  const json = await res.json();
  return json;
};

// 참여원 삭제 api
export const deleteTmmate = async (token, project, item) => {
  const res = await fetch(`${url}/api/project/teammate`, {
    method: "DELETE",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prjId: project.prjId,
      tmId: item.tmId,
    }),
  });
  const json = await res.json();
  return json;
};

// 선택한 프로젝트의 홈화면 정보 가져오는 api
export const getPrjInfo = async (token, projectId) => {
  const response = await fetch(`${url}/api/project/view/${projectId}`, {
    headers: { Authorization: token },
    method: "GET",
  });

  const json = await response.json();

  return json.body;
};

// 클라이언트 정보 가져오는 api
export const getClient = async (token, setClientData) => {
  const response = await fetch(`${url}/api/project/client`, {
    headers: { Authorization: token },
    method: "GET",
  });
  const json = await response.json();
  const list = json.body.map((client) => ({
    label: client.clntName,
    value: client.clntId,
  }));
  await setClientData(list);
  console.log(list);
};

// 프로젝트 생성, 수정 시 선택 가능한 부서 가져오는 api
export const getDept = async (token, setDeptData) => {
  const response = await fetch(`${url}/api/v1/department`, {
    headers: { Authorization: token },
    method: "GET",
  });
  const json = await response.json();
  const list = json.body.map((dept) => ({
    label: dept.deptName,
    value: dept.deptId,
  }));
  setDeptData(list);
};

// 프로젝트 생성, 수정 시 선택한 부서에 속한 사원 가져오는 api
export const getPmCandidates = async (
  deptSelectedData,
  token,
  setPmCandidate
) => {
  if (deptSelectedData === "부서를 선택해주세요.") return;

  const response = await fetch(
    `${url}/api/project/employee/findbydeptid/${deptSelectedData}`,
    {
      headers: { Authorization: token },
      method: "GET",
    }
  );
  const json = await response.json();
  const list = json.body.map((employee) => ({
    label: employee.empName,
    value: employee.empId,
  }));
  setPmCandidate(list);
};

// 프로젝트 수정하는 api
export const modifyPrj = async (token, projectId, dataArray) => {
  const response = await fetch(`${url}/api/project/write/${projectId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(dataArray),
  });

  const json = await response.json();
  return json;
};

// 프로젝트 리스트 가져오는 api
export const getPrjList = async (token) => {
  const response = await fetch(`${url}/api/project/search`, {
    headers: { Authorization: token },
    method: "GET",
  });
  const json = await response.json();
  return json.body;
};

// 앞으로의 프로젝트 리스트 가져오는 api
export const getMyEvent = async (token) => {
  const res = await fetch(`${url}/api/project/upcoming/event`, {
    headers: { Authorization: token },
    method: "GET",
  });
  const json = await res.json();
  return json;
};
