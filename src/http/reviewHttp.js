/**
 * Review(후기) 에 대한 메서드 집합
 */

// view 메서드
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

// 후기 작성 메서드
export const writeReview = async (token, rvCntnt, prjId) => {
  const formData = new FormData();
  formData.append("rvCntnt", rvCntnt);
  formData.append("prjId", prjId);

  console.log(rvCntnt);

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

// 후기 삭제 메서드
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

// 후기 수정 메서드
export const modifyReview = async (token) => {
  const selectedProjectId = 3;

  const response = await fetch(
    `http://localhost8080/api/review/writes${selectedProjectId}`,
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
