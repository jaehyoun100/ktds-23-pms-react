import { createSlice } from "@reduxjs/toolkit";

//slice store 생성
export const memoAddrSliceStore = createSlice({
  name: "receiverList",
  initialState: {
    rcvList: [],
    rcvRefList: [],
    rcvSecretRefList: [],
    searchEmployeeList: [],
  },
  reducers: {
    // 검색한 사원목록
    saveSearchEmpList(state, action) {
      state.searchEmployeeList = action.payload.searchEmpList;
    },
    resetSearchEmpList(state, action) {
      state.searchEmployeeList = [];
    },
    // 수신 목록
    addRcvList(state, action) {
      const receiverList = action.payload.rcvList.filter(
        (newEmp) =>
          !state.rcvList.some((originEmp) => originEmp.empId === newEmp.empId)
      );

      state.rcvList.push(...receiverList);
    },
    deleteRcvList(state, action) {
      state.rcvList = action.payload.rcvList;
    },
    // 참조 목록
    addRcvRefList(state, action) {
      const receiverRefList = action.payload.rcvRefList.filter(
        (newEmp) =>
          !state.rcvRefList.some(
            (originEmp) => originEmp.empId === newEmp.empId
          )
      );
      state.rcvRefList.push(...receiverRefList);
    },
    deleteRcvRefList(state, action) {
      state.rcvRefList = action.payload.rcvRefList;
    },
    // 숨은 참조 목록
    addRcvSecretRefList(state, action) {
      const receiverSecretRefList = action.payload.rcvSecretRefList.filter(
        (newEmp) =>
          !state.rcvSecretRefList.some(
            (originEmp) => originEmp.empId === newEmp.empId
          )
      );
      state.rcvSecretRefList.push(...receiverSecretRefList);
    },
    deleteRcvSecretRefList(state, action) {
      state.rcvSecretRefList = action.payload.rcvSecretRefList;
    },
  },
});

export const memoAddrAction = memoAddrSliceStore.actions;
