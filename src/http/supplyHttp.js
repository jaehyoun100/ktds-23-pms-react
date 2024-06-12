const url =
  "http://" +
  (window.location.host === "43.202.29.221"
    ? "43.202.29.221"
    : "localhost:8080");

export const loadSupplyList = async ({ token, pageNo = 0 }) => {
  if (!token) {
    return undefined;
  }

  const response = await fetch(`${url}/api/v1/supply?pageNo=${pageNo}`, {
    method: "GET",
    headers: { Authorization: token },
  });

  const json = await response.json();

  return json;
};

export const loadSupply = async ({ selectedSplId, token }) => {
  const response = await fetch(`${url}/api/v1/supply/${selectedSplId}`, {
    method: "GET",
    headers: { Authorization: token },
  });

  const json = await response.json();

  return json;
};

export const loadSupplyImage = async ({ splImg, token }) => {
  const response = await fetch(`${url}/api/v1/supply/image/${splImg}`, {
    method: "GET",
    headers: { Authorization: token },
  });

  const json = await response.json();
  return json.body ? `data:image/jpeg;base64,${json.body}` : null;
};

export const loadSupplyCategory = async ({ token }) => {
  const response = await fetch(`${url}/api/v1/supply/category`, {
    method: "GET",
    headers: { Authorization: token },
  });

  const json = await response.json();
  return json.body;
};

export const registerSupply = async (
  token,
  name,
  category,
  price,
  stock,
  image,
  detail
) => {
  const data = new FormData();
  data.append("splName", name);
  data.append("splCtgr", category);
  data.append("splPrice", price);
  data.append("invQty", stock);
  data.append("file", image);
  data.append("splDtl", detail);

  const response = await fetch(`${url}/api/v1/supply`, {
    method: "POST",
    headers: { Authorization: token },
    body: data,
  });

  const json = await response.json();

  return json;
};

export const modifySupply = async (
  token,
  splId,
  name,
  category,
  price,
  stock,
  image,
  detail
) => {
  const data = new FormData();
  data.append("splName", name);
  data.append("splCtgr", category);
  data.append("splPrice", price);
  data.append("invQty", stock);
  data.append("file", image);
  data.append("splDtl", detail);

  const response = await fetch(`${url}/api/v1/supply/${splId}`, {
    method: "PUT",
    headers: { Authorization: token },
    body: data,
  });

  const json = await response.json();

  return json;
};

export const deleteSupply = async (splId, token) => {
  const response = await fetch(`${url}/api/v1/supply/${splId}`, {
    method: "DELETE",
    headers: { Authorization: token },
  });

  const json = await response.json();

  return json;
};

export const loadSupplyLogList = async ({ token, pageNo = 0 }) => {
  if (!token) {
    return undefined;
  }

  const response = await fetch(`${url}/api/v1/supply/log?pageNo=${pageNo}`, {
    method: "GET",
    headers: { Authorization: token },
  });

  const json = await response.json();

  return json;
};
