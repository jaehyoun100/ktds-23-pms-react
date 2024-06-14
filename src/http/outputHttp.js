const url =
  "http://" +
  (window.location.host === "43.202.29.221"
    ? "43.202.29.221"
    : "localhost:8080");

export const loadOutputs = async (token, prjIdValue) => {
  if (!token) {
    return undefined;
  }
  const response = await fetch(`${url}/api/v1/output/search/${prjIdValue}`, {
    method: "GET",
    headers: { Authorization: token },
  });
  const json = await response.json();

  return json;
};

export const loadForWriteOutputData = async (token) => {
  if (!token) {
    return undefined;
  }
  const response = await fetch(`${url}/api/v1/output/write`, {
    method: "GET",
    headers: { Authorization: token },
  });
  const json = await response.json();

  return json;
};

export const writeOutput = async (token, formData) => {
  if (!token) {
    return undefined;
  }
  const response = await fetch(`${url}/api/v1/output/write`, {
    method: "POST",
    headers: { Authorization: token },
    body: formData,
  });
  const json = await response.json();

  return json;
};

export const loadForModifyOutputData = async ({ token, selectedOutputId }) => {
  if (!token) {
    return undefined;
  }
  const response = await fetch(
    `${url}/api/v1/output/modify/${selectedOutputId}`,
    {
      method: "GET",
      headers: { Authorization: token },
    }
  );
  const json = await response.json();

  return json;
};

export const modifyOutput = async (token, selectedOutputId, formData) => {
  const response = await fetch(
    `${url}/api/v1/output/modify/${selectedOutputId}`,
    {
      method: "PUT",
      headers: {
        Authorization: token,
      },
      body: formData,
    }
  );

  const json = await response.json();

  return json;
};

export const deleteOutput = async (token, selectedOutputId) => {
  const response = await fetch(
    `${url}/api/v1/output/delete/${selectedOutputId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    }
  );

  const json = await response.json();

  return json;
};

export const outputFileDownload = async (token, selectedOutputId) => {
  const response = await fetch(
    `${url}/api/v1/output/downloadFile/${selectedOutputId}`,
    {
      method: "GET",
      headers: { Authorization: token },
    }
  );
  // const json = await response.json();

  return response;
};

export const getFileDataForModify = async (token, originFileName) => {
  const response = await fetch(`${url}/api/v1/output/file/${originFileName}`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });

  // const json = await response.json();

  return response;
};
