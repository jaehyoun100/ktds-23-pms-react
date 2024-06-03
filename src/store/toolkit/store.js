import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { tokenSliceStore } from "./slice/tokenSlice";

//slice store 생성
const userDetailSliceStore = createSlice({
  name: "employee",
  initialState: {},
  reducers: {
    get(state, action) {
      //action으로 넘겨받은 employeeVO 를 state 에 삽입
      state.push(action);
    },
  },
});

//redux store 생성
const toolkitStore = configureStore({
  reducer: {
    employee: userDetailSliceStore.reducer,
    tokenInfo: tokenSliceStore.reducer,
  },
});
// store action 공유
export const stateActions = userDetailSliceStore.actions;

// provider component 생성
export default function ToolkitProvider({ children }) {
  return <Provider store={toolkitStore}>{children}</Provider>;
}
