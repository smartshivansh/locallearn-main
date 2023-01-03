import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const authDataInitialState = {
  isAuthenticated: "null",
};

const authSlice = createSlice({
  name: "authentication",
  initialState: authDataInitialState,
  reducers: {
    authStatusLogin(state, action) {
      state.isAuthenticated = true;
    },
    authStatusLogout(state, action) {
      state.isAuthenticated = false;
    },
  },
});

export default authSlice;
