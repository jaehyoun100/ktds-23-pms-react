import { approvalActions } from "../store/toolkit/slice/approvalSlice";
import { tokenExpire } from "../utils/loginUtil";

const url =
  "http://" +
  (window.location.host === "43.202.29.221"
    ? "43.202.29.221"
    : "localhost:8080");

/**
 * 승인 요청자의 승인요청을 가져오는 fetch 함수를 표시 함
 */
export const getApprovalListByRequester = (token) => {
  return async (dispatch) => {
    const response = await fetch(url + `/api/approval/requester`, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    dispatch(tokenExpire(json));
    dispatch(approvalActions.set(json));
  };
};
/**
 * 승인자의 승인요청을 가져오는 fetch 함수를 표시 함
 */
export const getApprovalListByApprover = (token) => {
  return async (dispatch) => {
    const response = await fetch(url + `/api/approval/approver`, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    dispatch(tokenExpire(json));
    dispatch(approvalActions.set(json));
  };
};
/**
 * apprId 를 받아서 해당 apprId 가 가지고 있는 정보를 통해 실제 결제시 업데이트되는 정보를 반환해준다
 * @param {*} apprId
 * @returns
 */
export const getApprInfo = (apprId, token) => {
  return async (dispatch) => {
    const response = await fetch(url + `/api/approval/${apprId}`, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    dispatch(tokenExpire(json));

    dispatch(approvalActions.getApprInfo(json));
  };
};

export const approveOneRequest = (apprId, apprRsn, apprYn, token) => {
  return async () => {
    if (apprRsn === undefined || apprRsn === "") {
      apprRsn = null;
    }
    const response = await fetch(url + `/api/approval`, {
      method: "PUT",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        apprId,
        apprRsn,
        apprYn,
      }),
    });
    const json = response.json;
  };
};
