/**
 * Review(후기) 에 대한 메서드 집합
 */

export const viewWriteReviewPage = async (token) => {
  const selectedProjectId = "PRJ_240501_000224";

  const response = await fetch(
    `http://localhost:8080/api/review/writes/${selectedProjectId}`,
    {
      method: "GET",
      headers: {
        Authorization: token,
      },
    }
  );
  const json = await response.json();
  return json;
};

export const writeReview = async (token, reviewContent) => {
  const formData = new FormData();
  formData.append("content", reviewContent);

  const response = await fetch("http://localhost:8080/api/review/writes", {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: formData,
  });

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
