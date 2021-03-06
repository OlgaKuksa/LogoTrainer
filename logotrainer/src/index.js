import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import store from "./config/store";
import { getSkillsAsync } from "./actions/skills";

store.dispatch(getSkillsAsync());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
