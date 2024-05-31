export const loadRentalSupplyList = async ({ token, pageNo = 0 }) => {
  if (!token) {
    return undefined;
  }

  const response = await fetch(
    `http://localhost:8080/api/v1/rentalsupply/list?pageNo=${pageNo}`,
    { method: "GET", headers: { Authorization: token } }
  );

  const json = await response.json();

  return json;
};
