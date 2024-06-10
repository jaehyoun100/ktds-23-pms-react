export const createSurvey = async (selectedProjectId, token, requestData) => {
  const response = await fetch(
    `http://localhost:8080/api/survey/create/${selectedProjectId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(requestData),
    }
  );

  const json = await response.json();
  return json;
};

export const createSurveyPick = async (srvId, token, options) => {
  const response = await fetch(
    `http://localhost:8080/api/survey/answer/${srvId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(options),
    }
  );

  const json = await response.json();
  return json;
};

export const loadSurveyList = async (token, selectedProjectId) => {
  const response = await fetch(
    `http://localhost:8080/api/survey/view/${selectedProjectId}`,
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
