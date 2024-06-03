import { createSlice } from "@reduxjs/toolkit";
//slice state 생성
export const tokenSliceStore = createSlice({
  name: "tokenInfo",
  initialState: {
    token: localStorage.getItem("token"), //Acess Token
    credentialsExpired: false /*비밀번호 만료 여부*/,
  },
  reducers: {
    login(state, action) {
      if (action.payload.token) {
        //action으로 넘겨받은 token값을  state 에 삽입
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);

        if (action.payload.credentialsExpired) {
          state.credentialsExpired = action.payload.credentialsExpired;
        }
      }
    },
    logout(state, action) {
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    },
  },
});

// store action 공유
export const tokenActions = tokenSliceStore.actions;
