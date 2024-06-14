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
