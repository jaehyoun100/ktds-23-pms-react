import { tokenActions } from "../store/toolkit/slice/tokenSlice";
import { stateActions } from "../store/toolkit/slice/userDetailSlice";

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

    dispatch(stateActions.get(json));
  };
};
/**
 * empId 와 pwd값을 받아서 서버에서 token을 생성
 * @param {*} param0 epmId: 사원번호 , pwd: 비밀번호
 * @returns
 */
export const getToken = (empId, pwd) => {
  return async (dispatch) => {
    const url = `http://localhost:8080/auth/token`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        empId,
        pwd,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (json.message) {
      alert(json.message);
      return;
    } else {
      if (json.credentialsExpired) {
        // setCredentialsExpired(json.credentialsExpired);
        alert("비밀번호 만료됨");
      }
      dispatch(tokenActions.get(json));
    }
  };
};
