import { tokenActions } from "../store/toolkit/slice/tokenSlice";
import { employeeActions } from "../store/toolkit/slice/userDetailSlice";

/**
 * Token 값을 받아서 서버에서 empVO 를 가져온 다음
 * 해당 값을 slice의  employee slice에 업데이트 한다
 * @param {*} token  Acess Token 값
 * @returns employeeVO state update
 */
export const getEmployee = (token) => {
  return async (dispatch) => {
    const url = "";
    const response = await fetch(url, {
      headers: { Authorization: token },
      method: "GET",
    });
    const json = await response.json();

    dispatch(employeeActions.get(json));
  };
};
/**
 * empId 와 pwd값을 받아서 서버에서 token을 생성
 * @param {*} param0 epmId: 사원번호 , pwd: 비밀번호
 * @returns
 */
export const getToken = (empId, pwd) => {
  return async (dispatch) => {
    const url =
      "http://" +
      (window.location.host === "43.202.29.221"
        ? "43.202.29.221"
        : "localhost:8080");
    const response = await fetch(url + "/auth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        empId,
        pwd,
      }),
    });
    const json = await response.json();

    if (json.message) {
      alert(json.message);
      return;
    } else {
      if (json.credentialsExpired) {
        // setCredentialsExpired(json.credentialsExpired);
        alert("비밀번호 만료됨");
      }
      dispatch(tokenActions.login(json));
    }
  };
};
export const logout = () => {
  // TODO 확인 모달창을 통해 퇴근인지 로그아웃인지 체크 필요함
  return async (dispatch) => {
    dispatch(tokenActions.logout({ token: "" }));
  };
};
