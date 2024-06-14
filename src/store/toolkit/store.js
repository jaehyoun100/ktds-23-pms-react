import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { tokenSliceStore } from "./slice/tokenSlice";
import { userDetailSliceStore } from "./slice/userDetailSlice";
import { memoAddrSliceStore } from "./slice/memoAddrSlice";
import { confirmModalSliceStore } from "./slice/confirmModalSlice";
import { commuteSliceStore } from "./slice/commuteSlice";
import { supplySliceStore } from "./slice/supplySlice";

//redux store 생성
const toolkitStore = configureStore({
  reducer: {
    employee: userDetailSliceStore.reducer,
    tokenInfo: tokenSliceStore.reducer,
    receiverList: memoAddrSliceStore.reducer,
    confirmModalInfo: confirmModalSliceStore.reducer,
    commuteInfo: commuteSliceStore.reducer,
    supply: supplySliceStore.reducer,
  },
});

// provider component 생성
export default function ToolkitProvider({ children }) {
  return <Provider store={toolkitStore}>{children}</Provider>;
}
