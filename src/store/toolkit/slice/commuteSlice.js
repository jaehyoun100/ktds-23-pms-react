import { createSlice } from "@reduxjs/toolkit";

export const commuteSliceStore = createSlice({
  name: "commuteInfo",
  initialState: {
    body: [],
    commute: {},
  },
  reducers: {
    set(state, action) {
      state.body = action.payload.body;
    },
    setCommute(state, action) {
      state.commute = action.payload.body;
    },
  },
});

export const commuteActions = commuteSliceStore.actions;
