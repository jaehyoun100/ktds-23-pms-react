import { createSlice } from "@reduxjs/toolkit";
//slice state 생성
export const tokenSliceStore = createSlice({
  name: "tokenInfo",
  initialState: {
    token: undefined, //Acess Token
    credentialsExpired: false /*비밀번호 만료 여부*/,
  },
  reducers: {
    get(state, action) {
      if (action.payload.token) {
        //action으로 넘겨받은 employeeVO 를 state 에 삽입
        state.token = action.payload.token;

        localStorage.setItem("token", action.payload.token);
      }
    },
  },
});

// store action 공유
export const tokenActions = tokenSliceStore.actions;
