import { createSlice } from "@reduxjs/toolkit";

export const supplySliceStore = createSlice({
  name: "supply",
  initialState: {
    selectedSplId: undefined,
    data: [],
    isLoading: true,
    hideZeroInventory: false,
    supplyLogData: [],
    supplyLogLoading: true,
    supplyBody: null,
    supplyImagePreview: null,
    supplyViewData: null,
    supplyViewImage: null,
    isImageEnlarged: false,
    isViewLoading: true,
  },
  reducers: {
    setSelectedSplId(state, action) {
      state.selectedSplId = action.payload.selectedSplId;
    },
    setData(state, action) {
      state.data = action.payload.data;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload.isLoading;
    },
    setHideZeroInventory(state, action) {
      state.hideZeroInventory = action.payload.hideZeroInventory;
    },
    setSupplyLogData(state, action) {
      state.supplyLogData = action.payload.supplyLogData;
      state.supplyLogLoading = false;
    },
    setSupplyLogLoading(state, action) {
      state.supplyLogLoading = action.payload.supplyLogLoading;
    },
    setSupplyBody(state, action) {
      state.supplyBody = action.payload.supplyBody;
    },
    setSupplyImagePreview(state, action) {
      state.supplyImagePreview = action.payload.supplyImagePreview;
    },
    setSupplyViewData(state, action) {
      state.supplyViewData = action.payload.supplyViewData;
    },
    setSupplyViewImage(state, action) {
      state.supplyViewImage = action.payload.supplyViewImage;
    },
    setIsImageEnlarged(state, action) {
      state.isImageEnlarged = action.payload.isImageEnlarged;
    },
    setIsViewLoading(state, action) {
      state.isViewLoading = action.payload.isViewLoading;
    },
  },
});

export const supplyActions = supplySliceStore.actions;
