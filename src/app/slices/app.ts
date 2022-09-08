import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface State {
  darkMode: boolean;
}

const initialState: State = {
  darkMode: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    darkmode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
    setany: (state, action) => {
      state = { ...state, ...action.payload };
    },
  },
});

export const { darkmode, setany } = appSlice.actions;
export const getAppAny = (state: RootState) => state.app;
export const getAppMode = (state: RootState) => state.app.darkMode;
