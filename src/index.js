import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider, useSelector } from "react-redux";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { theme as antdTheme, ConfigProvider } from "antd";
import reportWebVitals from "./reportWebVitals";
import routes from "./router";
import { store, themeSelector } from "./store";
import "./index.css";
import "highlight.js/styles/github.css";

const router = createBrowserRouter(createRoutesFromElements(routes), {
  basename: "/",
});

const Index = ({ children }) => {
  const { theme } = useSelector(themeSelector);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ConfigProvider
      theme={{
        algorithm:
          theme === "dark"
            ? antdTheme.darkAlgorithm
            : antdTheme.defaultAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Index>
        <RouterProvider router={router} />
      </Index>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
