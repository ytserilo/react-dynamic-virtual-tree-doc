import React from "react";
import { Route } from "react-router-dom";
import { Home } from "./pages/home";
import { Layout } from "./components/layout";
import { ApiReference } from "./pages/apiReference";
import { Tutorial } from "./pages/tutorial";
import { Tools } from "./pages/tools";

const routes = (
  <Route path="/">
    <Route element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="/api-reference" element={<ApiReference />} />
      <Route path="/tutorial" element={<Tutorial />} />
      <Route path="/tools" element={<Tools />} />
    </Route>
  </Route>
);

export default routes;
