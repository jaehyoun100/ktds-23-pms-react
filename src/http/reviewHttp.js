/**
 * Review(후기) 에 대한 메서드 집합
 */

const url =
    "http://" +
    (window.location.host === "43.202.29.221"
        ? "43.202.29.221"
        : "localhost:8080");
// view 메서드
export const viewWriteReviewPage = async (token, selectedProjectId) => {
  const response = await fetch(
    `${url}/api/review/writes/${selectedProjectId}`,
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
export const writeReview = async (token, rvCntnt, prjId, starRating) => {
  const formData = new FormData();
  formData.append("rvCntnt", rvCntnt);
  formData.append("prjId", prjId);
  formData.append("starRating", starRating);

  console.log(rvCntnt);

  const response = await fetch(`${url}/api/review/writes`, {
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
    `${url}/api/review/writes${selectedProjectId}`,
    {
      method: "PUT",
      headers: {
        Authorization: token,
      },
    }
  );

  const json = await response.json();
  console.log(json);
  return json;
};

// 후기 수정 메서드
export const modifyReview = async (token) => {
  const selectedProjectId = 3;

  const response = await fetch(
    `${url}/api/review/writes${selectedProjectId}`,
    {
      method: "PUT",
      headers: {
        Authorization: token,
      },
    }
  );
  const json = await response.json();
  console.log(json);
  return json;
};

// 후기 작성 가능 여부 메서드
export const getReviewYN = async (token, prjIdList) => {
  const response = await fetch(
    `${url}/api/review/writes/reviewyn`,
    {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prjIdList),
    }
  );
  const json = await response.json();
  return json;
};

// 사원이 속한 프로젝트 List 가져오기
export const getEmpPrjList = async (token) => {
  const response = await fetch(
    `${url}/api/review/writes/prjList`,
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

// 관리자 또는 PM 일 경우 프로젝트에 대한 모든 후기 가져오기
export const getReviewResultByprjId = async (token, prjId) => {
  const response = await fetch(
    `${url}/api/review/writes/reviewResult/${prjId}`,
    {
      headers: {
        Authorization: token,
          "Content-Type": "application/json",
      },
        method: "GET",
    }
  );
  const json = await response.json();
  return json;
};
