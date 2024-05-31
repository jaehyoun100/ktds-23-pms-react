/**
 * Review(후기) 에 대한 메서드 집합
 */

export const viewWriteReviewPage = async (token) => {
  await fetch("http://localhost:8080/api/review/writes", {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });
};

export const writeReview = async (token, empId, reviewContent) => {
  // 임시 프로젝트 번호
  const selectedProjectId = 3;

  const response = await fetch(
    `http://localhost:8080/api/review/writes${selectedProjectId}`,
    {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ empId, reviewContent }),
    }
  );

  const json = await response.json();
  console.log(json);
  return json;
};

export const deleteReview = async (token) => {
  // 임시 프로젝트 번호
  const selectedProjectId = 3;

  const response = await fetch(
    `http://localhost:8080/api/review/writes${selectedProjectId}`,
    {
      method: "PUT",
      headers: {
        Authorization: token,
      },
    }
  );

  const json = await response.json();
  console.log(json);
  return json();
};
