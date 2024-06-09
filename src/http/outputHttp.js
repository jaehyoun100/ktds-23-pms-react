export const loadOutputs = async (token) => {
    if(!token){
        return undefined;
    }
    const response = await fetch(
      `http://localhost:8080/api/v1/output/search`,
      {
        method: "GET",
        headers: { Authorization: token },
      }
    );
    const json = await response.json();

    return json;
}