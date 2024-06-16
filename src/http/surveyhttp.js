const url =
  "http://" +
  (window.location.host === "43.202.29.221"
    ? "43.202.29.221"
    : "localhost:8080");

export const createSurvey = async (selectedProjectId, token, requestData) => {
  const response = await fetch(
    `${url}/api/survey/create/${selectedProjectId}`,
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
    `${url}/api/survey/answer/${srvId}`,
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
    `${url}/api/survey/view/${selectedProjectId}`,
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

export const registSurveyQuestion = async (token, srvId, srvRplCntnt, sqpId) => {
  const response = await fetch(
    `${url}/api/survey/reply/${srvId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ srvId, srvRplCntnt, sqpId }),
    }
  );
  if (!response.ok) {
    throw new Error("설문 제출 실패");
  }
};