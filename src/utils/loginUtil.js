import { tokenActions } from "../store/toolkit/slice/tokenSlice";

/**
 * 토큰이 만료된 경우 json 에 있는 tokenExpire key를 탐지하여
 * 로그아웃을 진행하고 재로그인 요청 alert 을 보낸다
 * @param {} json response.json()
 */
export const tokenExpire = (json) => {
  // http response 에 tokenExpire키가 있는경우
  return async (dispatch) => {
    if (json.tokenExpire) {
      alert(json.tokenExpire);
      dispatch(tokenActions.logout({ token: "" }));
    }
  };
};
