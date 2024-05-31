export const loadEmployeeList = async ({ token, pageNo = 0 }) => {
  if (!token) {
    return undefined;
  }
  const response = await fetch(
    `http://localhost:8080/api/v1/employee?pageNo=${pageNo}`,
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

export const loadOndEmployee = async ({ token, selectedEmpId }) => {
  const response = await fetch(
    `http://localhost:8080/api/v1/employee/${selectedEmpId}`,
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
