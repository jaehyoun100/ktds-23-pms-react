import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { tokenSliceStore } from "./slice/tokenSlice";
import { userDetailSliceStore } from "./slice/userDetailSlice";

//redux store 생성
const toolkitStore = configureStore({
  reducer: {
    employee: userDetailSliceStore.reducer,
    tokenInfo: tokenSliceStore.reducer,
  },
});

// provider component 생성
export default function ToolkitProvider({ children }) {
  return <Provider store={toolkitStore}>{children}</Provider>;
}
