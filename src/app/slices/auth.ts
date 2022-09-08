import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface State {
  uid: string;
  name: string;
  [value: string]: any;
}

const initialState: State = {
  uid: "",
  name: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ uid: string; name: string; [value: string]: any }>) => {
      state = action.payload;
    },
    logout: (state) => {
      state = { uid: "", name: "" };
    },
  },
});

export const { login, logout } = authSlice.actions;
export const getAuth = (state: RootState) => state.auth;
export const getAuthUID = (state: RootState) => state.auth.uid;
export const getAuthName = (state: RootState) => state.auth.name;
