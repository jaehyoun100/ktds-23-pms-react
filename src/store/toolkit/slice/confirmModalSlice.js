import { createSlice } from "@reduxjs/toolkit";

export const confirmModalSliceStore = createSlice({
  name: "confirmModalInfo",
  initialState: {
    show: false,
    content: "내용을 입력해주세요",
    confirmContent: "확인버튼",
    cancelContent: "취소버튼",
    confirmOnClick: () => {},
    cancelOnClick: () => {},
  },
  reducers: {
    /**
     * 모달을 닫는다 끝
     * @param {*} state
     * @param {*} action
     */
    close(state, action) {
      state.show = false;
      state.content = "내용을 입력해주세요";
      state.confirmContent = "확인버튼";
      state.cancelContent = "취소버튼";
      state.confirmOnClick = () => {
        return (state.show = false);
      };
      state.cancelOnClick = () => {
        return (state.show = false);
      };
    },
    set(state, action) {
      state.show = true;
      state.content = action.payload.content;
      state.confirmContent = action.payload.confirmContent;
      state.cancelContent = action.payload.cancelContent;
      state.confirmOnClick = () => {
        state.show = false;
        return action.payload.confirmOnClick;
      };
      state.cancelOnClick = () => {
        state.show = false;
        return action.payload.confirmOnClick;
      };
    },
  },
});

export const confirmModalActions = confirmModalSliceStore.actions;
