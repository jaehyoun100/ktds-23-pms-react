import { createSlice } from "@reduxjs/toolkit";

export const approvalSliceStore = createSlice({
  name: "approvalInfo",
  initialState: {
    apprCnt: 0,
    apprList: [],
    apprInfo: {},
  },
  reducers: {
    set(state, action) {
      state.apprCnt = action.payload.body.apprCnt;
      state.apprList = action.payload.body.apprList;
    },
    getApprInfo(state, action) {
      state.apprInfo = action.payload.apprInfo;
    },
  },
});

export const approvalActions = approvalSliceStore.actions;
