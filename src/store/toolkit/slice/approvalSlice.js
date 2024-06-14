import { createSlice } from "@reduxjs/toolkit";

export const approvalSliceStore = createSlice({
  name: "approvalInfo",
  initialState: {
    apprCnt: 0,
    apprList: [],
  },
  reducers: {
    set(state, action) {
      state.apprCnt = action.payload.body.apprCnt;
      state.apprList = action.payload.body.apprList;
    },
  },
});

export const approvalActions = approvalSliceStore.actions;
