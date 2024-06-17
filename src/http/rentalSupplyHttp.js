const url =
  "http://" +
  (window.location.host === "43.202.29.221"
    ? "43.202.29.221"
    : "localhost:8080");

export const loadRentalSupplyList = async ({ token, pageNo = 0 }) => {
  if (!token) {
    return undefined;
  }

  const response = await fetch(`${url}/api/v1/rentalsupply?pageNo=${pageNo}`, {
    method: "GET",
    headers: { Authorization: token },
  });

  const json = await response.json();

  return json;
};

export const loadRentalSupply = async ({ selectedRsplId, token }) => {
  const response = await fetch(`${url}/api/v1/rentalsupply/${selectedRsplId}`, {
    method: "GET",
    headers: { Authorization: token },
  });

  const json = await response.json();

  return json;
};

export const loadRentalSupplyImage = async ({ rsplImg, token }) => {
  const response = await fetch(`${url}/api/v1/rentalsupply/image/${rsplImg}`, {
    method: "GET",
    headers: { Authorization: token },
  });

  const json = await response.json();
  return json.body ? `data:image/jpeg;base64,${json.body}` : null;
};

export const loadRentalSupplyCategory = async ({ token }) => {
  const response = await fetch(`${url}/api/v1/rentalsupply/category`, {
    method: "GET",
    headers: { Authorization: token },
  });

  const json = await response.json();
  return json.body;
};

export const registerRentalSupply = async (
  token,
  name,
  category,
  price,
  stock,
  image,
  detail
) => {
  const data = new FormData();
  data.append("rsplName", name);
  data.append("rsplCtgr", category);
  data.append("rsplPrice", price);
  data.append("invQty", stock);
  data.append("file", image);
  data.append("rsplDtl", detail);

  const response = await fetch(`${url}/api/v1/rentalsupply`, {
    method: "POST",
    headers: { Authorization: token },
    body: data,
  });

  const json = await response.json();

  return json;
};

export const modifyRentalSupply = async (
  token,
  rsplId,
  name,
  category,
  price,
  stock,
  image,
  detail
) => {
  const data = new FormData();
  data.append("rsplName", name);
  data.append("rsplCtgr", category);
  data.append("rsplPrice", price);
  data.append("invQty", stock);
  data.append("file", image);
  data.append("rsplDtl", detail);

  const response = await fetch(`${url}/api/v1/rentalsupply/${rsplId}`, {
    method: "PUT",
    headers: { Authorization: token },
    body: data,
  });

  const json = await response.json();

  return json;
};

export const deleteRentalSupply = async (rsplId, token) => {
  const response = await fetch(`${url}/api/v1/rentalsupply/${rsplId}`, {
    method: "DELETE",
    headers: { Authorization: token },
  });

  const json = await response.json();

  return json;
};

export const loadRentalSupplyApprovalList = async ({ token, pageNo = 0 }) => {
  if (!token) {
    return undefined;
  }

  const response = await fetch(
    `${url}/api/v1/rentalsupply/log?pageNo=${pageNo}`,
    {
      method: "GET",
      headers: { Authorization: token },
    }
  );

  const json = await response.json();

  return json;
};

export const applyForMultipleRentalSupplies = async (token, supplies) => {
  const response = await fetch(`${url}/api/v1/rentalsupply/apply`, {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(supplies),
  });

  const json = await response.json();

  return json;
};

export const returnRentalSupply = async ({
  rsplApprId,
  rsplRqstQty,
  token,
}) => {
  if (!token) {
    return undefined;
  }

  const response = await fetch(`${url}/api/v1/rentalsupply/return`, {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ rsplApprId, rsplRqstQty }),
  });

  const json = await response.json();

  return json;
};
