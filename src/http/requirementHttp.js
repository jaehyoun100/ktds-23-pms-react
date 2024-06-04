export const loadRequirements = async (token) => {
  if (!token) {
    return undefined;
  }
  const response = await fetch(
    `http://localhost:8080/api/v1/requirement/search`,
    {
      method: "GET",
      headers: { Authorization: token },
    }
  );

  const json = await response.json();

  return json;
};

export const loadOneRequirement = async (token, prjId, rqmId) => {
  if (!token) {
    return undefined;
  }
  const response = await fetch(
    `http://localhost:8080/api/v1/requirement/view?prjId=${prjId}&rqmId=${rqmId}`,
    {
      method: "GET",
      headers: { Authorization: token },
    }
  );
  const json = await response.json();

  return json;
};

export const loadForWriteData = async (token) => {
  if (!token) {
    return undefined;
  }
  const response = await fetch(
    `http://localhost:8080/api/v1/requirement/write`,
    {
      method: "GET",
      headers: { Authorization: token },
    }
  );
  const json = await response.json();

  return json;
};

export const loadNameByPrjName = async ({ token, selectedPrjId }) => {
  if (!token) {
    return undefined;
  }
  const response = await fetch(
    `http://localhost:8080/api/v1/requirement/write/${selectedPrjId}`,
    {
      method: "GET",
      headers: { Authorization: token },
    }
  );
  const json = await response.json();

  return json;
};
