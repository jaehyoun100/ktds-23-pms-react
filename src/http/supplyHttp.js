export const loadSupplyList = async ({ token, pageNo = 0 }) => {
  if (!token) {
    return undefined;
  }

  const response = await fetch(
    `http://localhost:8080/api/v1/supply?pageNo=${pageNo}`,
    { method: "GET", headers: { Authorization: token } }
  );

  const json = await response.json();

  return json;
};

export const loadSupply = async ({ selectedSplId, token }) => {
  const response = await fetch(
    `http://localhost:8080/api/v1/supply/${selectedSplId}`,
    { method: "GET", headers: { Authorization: token } }
  );

  const json = await response.json();
  console.log(json);
  return json;
};

export const registerSupply = async (
  token,
  name,
  category,
  price,
  image,
  detail
) => {
  const data = new FormData();
  data.append("splName", name);
  data.append("splCtgr", category);
  data.append("splPrice", price);
  data.append("splImg", image);
  data.append("splDtl", detail);

  const response = await fetch("http://localhost:8080/api/v1/supply", {
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
  image,
  detail
) => {
  const data = new FormData();
  data.append("splName", name);
  data.append("splCtgr", category);
  data.append("splPrice", price);
  data.append("splImg", image);
  data.append("splDtl", detail);

  const response = await fetch(`http://localhost:8080/api/v1/supply/${splId}`, {
    method: "PUT",
    headers: { Authorization: token },
    body: data,
  });

  const json = await response.json();

  return json;
};
