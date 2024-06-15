import { approvalActions } from "../store/toolkit/slice/approvalSlice";

const url =
  "http://" +
  (window.location.host === "43.202.29.221"
    ? "43.202.29.221"
    : "localhost:8080");
/**
 * 승인요청을 가져오는 fetch 함수를 표시 함
 */
export const getApprovalList = (token) => {
  return async (dispatch) => {
    const response = await fetch(url + `/api/approval`, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    dispatch(approvalActions.set(json));
  };
};
/**
 * apprId 를 받아서 해당 apprId 가 가지고 있는 정보를 통해 실제 결제시 업데이트되는 정보를 반환해준다
 * @param {*} apprId
 * @returns
 */
export const getApprInfo = (apprId) => {
  return async (dispatch) => {
    const response = await fetch(url, {});

    const json = response.json();

    dispatch(approvalActions.getApprInfo(json));
  };
};
