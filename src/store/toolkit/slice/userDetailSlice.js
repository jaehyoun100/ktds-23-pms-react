import { createSlice } from "@reduxjs/toolkit";

//slice store 생성
export const userDetailSliceStore = createSlice({
  name: "employee",
  initialState: {},
  reducers: {
    get(state, action) {
      //action으로 넘겨받은 employeeVO 를 state 에 삽입
      state.push(action);
    },
  },
});

// store action 공유
export const employeeActions = userDetailSliceStore.actions;
