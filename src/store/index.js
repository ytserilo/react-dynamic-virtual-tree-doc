import { configureStore } from "@reduxjs/toolkit";
import theme from "./themeStore";

export const store = configureStore({
  reducer: {
    theme,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

export const themeSelector = (state) => state.theme;
