import { createSlice } from "@reduxjs/toolkit";

export const commuteSliceStore = createSlice({
  name: "commuteInfo",
  initialState: {
    body: [],
  },
  reducers: {
    set(state, action) {
      state.body = action.payload.body;
    },
  },
});

export const commuteActions = commuteSliceStore.actions;
