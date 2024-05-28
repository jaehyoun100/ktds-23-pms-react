//충돌때문에 http를 나누었습니다

export const example = async () => {
  const response = await fetch("URL", {
    //method : "",
  });
  const json = await response.json();
  return json;
};
