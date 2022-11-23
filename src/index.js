import React from "react";
import { createRoot } from "react-dom/client";
import store from "./store";
import { Provider } from "react-redux";
import "../public/index.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <Root />
  </Provider>
);
