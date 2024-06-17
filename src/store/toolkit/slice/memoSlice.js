import { createSlice } from "@reduxjs/toolkit";

export const memoSliceStore = createSlice({
  name: "memoInfo",
  initialState: {
    myInfo: {},
  },
  reducers: {
    // 로그인한 사원정보
    saveMyInfo(state, action) {
      state.myInfo = action.payload.myInfo;
    },
  },
});

export const memoAction = memoSliceStore.actions;
