const url =
  "http://" +
  (window.location.host === "43.202.29.221"
    ? "43.202.29.221"
    : "localhost:8080");

export const loadRequirements = async (token) => {
  if (!token) {
    return undefined;
  }
  const response = await fetch(`${url}/api/v1/requirement/search`, {
    method: "GET",
    headers: { Authorization: token },
  });

  const json = await response.json();

  return json;
};

export const loadOneRequirement = async (token, prjId, rqmId) => {
  if (!token) {
    return undefined;
  }
  const response = await fetch(
    `${url}/api/v1/requirement/view?prjId=${prjId}&rqmId=${rqmId}`,
    {
      method: "GET",
      headers: { Authorization: token },
    }
  );
  const json = await response.json();

  return json;
};

export const loadForWriteRequirementData = async (token) => {
  if (!token) {
    return undefined;
  }
  const response = await fetch(`${url}/api/v1/requirement/write`, {
    method: "GET",
    headers: { Authorization: token },
  });
  const json = await response.json();

  return json;
};

export const loadNameByPrjName = async ({ token, selectedPrjId }) => {
  if (!token) {
    return undefined;
  }
  const response = await fetch(
    `${url}/api/v1/requirement/write/${selectedPrjId}`,
    {
      method: "GET",
      headers: { Authorization: token },
    }
  );
  const json = await response.json();

  return json;
};

export const writeRequirement = async (token, formData) => {
  if (!token) {
    return undefined;
  }
  const response = await fetch(`${url}/api/v1/requirement/write`, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: formData,
  });

  const json = await response.json();

  return json;
};

export const loadForModifyRequirementData = async (token, prjId, rqmId) => {
  if (!token) {
    return undefined;
  }
  const response = await fetch(
    `${url}/api/v1/requirement/modify?prjId=${prjId}&rqmId=${rqmId}`,
    {
      method: "GET",
      headers: { Authorization: token },
    }
  );
  const json = await response.json();

  return json;
};

export const modifyRequirement = async (token, rqmId, formData) => {
  const response = await fetch(`${url}/api/v1/requirement/modify/${rqmId}`, {
    method: "PUT",
    headers: {
      Authorization: token,
    },
    body: formData,
  });

  const json = await response.json();

  return json;
};

export const deleteRequirement = async (token, rqmId) => {
  const response = await fetch(`${url}/api/v1/requirement/delete/${rqmId}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  });

  const json = await response.json();

  return json;
};
