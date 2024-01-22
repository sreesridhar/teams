import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  recentlyVisitedUrl: "/profile",
  showLogout: false,
  sideBarStatus: false,
  constant : {},
  localities: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    showLoader: (state) => {
      state.loading = true;
    },
    hideLoader: (state) => {
      state.loading = false;
    },
    setRecentUrl: (state, { payload }) => {
      state.recentlyVisitedUrl = payload;
    },
    setShowLogout: (state, { payload }) => {
      state.showLogout = payload;
    },
    toggleSidebar: (state, { payload }) => {
      state.sideBarStatus = payload;
    },
    setConstant : (state, {payload}) => {
      state.constant = payload
    },
    setLocalities : (state, {payload}) => {
      state.localities = payload
    }
     
  },
});

export const {
  showLoader,
  hideLoader,
  setRecentUrl,
  setShowLogout,
  toggleSidebar,
  setConstant,
  setLocalities,
} = appSlice.actions;

export default appSlice.reducer;
