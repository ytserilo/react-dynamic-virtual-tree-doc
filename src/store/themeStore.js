import { createSlice } from "@reduxjs/toolkit";
import { THEME } from "../constants/localStorageConstants";

const getTheme = () => {
  const theme = localStorage.getItem(THEME);
  if (["light", "dark"].includes(theme)) {
    return theme;
  } else {
    return "light";
  }
};

const initialState = {
  theme: getTheme(),
};

const { reducer, actions: _actions } = createSlice({
  name: "leagues",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      localStorage.setItem(THEME, action.payload);
      state.theme = action.payload;
    },
  },
});

export default reducer;
export const { setTheme } = _actions;
