import { createSlice } from "@reduxjs/toolkit";

export const approvalSliceStore = createSlice({
  name: "approvalInfo",
  initialState: {
    apprCnt: 0,
    apprList: [],
    apprInfo: {},
    approvalVO: {},
  },
  reducers: {
    set(state, action) {
      state.apprCnt = action.payload.body.apprCnt;
      state.apprList = action.payload.body.apprList;
    },
    getApprInfo(state, action) {
      state.apprInfo = action.payload.body.approvalInfo;
      state.approvalVO = action.payload.body.approvalVO;
    },
  },
});

export const approvalActions = approvalSliceStore.actions;
