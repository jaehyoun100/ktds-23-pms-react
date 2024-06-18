const url =
  "http://" +
  (window.location.host === "43.202.29.221"
    ? "43.202.29.221"
    : "localhost:8080");
export const loadDepartmentList = async ({ token, pageNo = 0 }) => {
  if (!token) {
    return undefined;
  }
  const response = await fetch(`${url}/api/v1/department?pageNo=${pageNo}`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });
  const json = await response.json();

  return json;
};

export const loadDepartmentDetail = async ({ token, selectedDeptId }) => {
  if (!token) {
    return undefined;
  }
  const response = await fetch(
    `${url}/api/v1/department/detail/${selectedDeptId}`,
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

export const loadTeamDetail = async ({ token, selectTmId }) => {
  if (!token) {
    return undefined;
  }
  const response = await fetch(`${url}/api/v1/team/detail/${selectTmId}`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });
  const json = await response.json();

  return json;
};

export const loadTeamList = async ({ token, selectedDeptId }) => {
  if (!token) {
    return undefined;
  }
  const response = await fetch(`${url}/api/v1/department/${selectedDeptId}`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });
  const json = await response.json();

  return json;
};

export const loadTeamMemberList = async ({ token, selectTmId }) => {
  if (!token) {
    return undefined;
  }
  const response = await fetch(`${url}/api/v1/team/${selectTmId}`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });
  const json = await response.json();

  return json;
};

export const createDepartment = async (token, name, empId, reason) => {
  const data = {
    deptName: name,
    deptLeadId: empId,
    deptApprReason: reason,
  };

  const response = await fetch(`${url}/api/v1/department`, {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json = await response.json();

  return json;
};

export const createTeam = async (token, name, empId, deptId) => {
  const data = {
    tmName: name,
    tmLeadId: empId,
    deptId: deptId,
  };

  const response = await fetch(`${url}/api/v1/team`, {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json = await response.json();

  return json;
};

export const createTeamMember = async (token, tmId, deptId, tmApprReason) => {
  const data = {
    tmId: tmId,
    deptId: deptId,
    tmApprReason: tmApprReason,
  };

  const response = await fetch(`${url}/api/v1/team/member`, {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json = await response.json();

  return json;
};

export const deleteDepartment = async (token, selectedDeptId) => {
  if (!token) {
    return undefined;
  }
  const response = await fetch(
    `${url}/api/v1/department/delete/${selectedDeptId}`,
    {
      method: "DELETE",
      headers: { Authorization: token },
    }
  );
  const json = await response.json();
  return json;
};

export const deleteTeam = async (token, selectTmId) => {
  if (!token) {
    return undefined;
  }
  const response = await fetch(`${url}/api/v1/team/delete/${selectTmId}`, {
    method: "DELETE",
    headers: { Authorization: token },
  });
  const json = await response.json();
  return json;
};

export const modifyDepartment = async (
  token,
  empId,
  empName,
  deptName,
  deptId,
  deptApprReason
) => {
  const data = {
    deptLeadId: empId,
    empName: empName,
    deptName: deptName,
    deptId: deptId,
    deptApprReason: deptApprReason,
  };

  const response = await fetch(`${url}/api/v1/department/modify`, {
    method: "PUT",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  return json;
};

export const modifyTeam = async (
  token,
  tmLeadId,
  tmId,
  tmName,
  tmApprReason
) => {
  const data = {
    tmLeadId: tmLeadId,
    tmId: tmId,
    tmName: tmName,
    tmApprReason: tmApprReason,
  };

  const response = await fetch(`${url}/api/v1/team/modify`, {
    method: "PUT",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  return json;
};
