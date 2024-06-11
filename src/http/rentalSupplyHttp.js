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
  // image,
  detail
) => {
  const data = new FormData();
  data.append("rsplName", name);
  data.append("rsplCtgr", category);
  data.append("rsplPrice", price);
  data.append("invQty", stock);
  // data.append("rsplImg", image);
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
  const response = await fetch(`${url}/api/v1/supply/${rsplId}`, {
    method: "DELETE",
    headers: { Authorization: token },
  });

  const json = await response.json();

  return json;
};
