import "focus-visible";

import "normalize.css";
import "./styles/base.scss";

import { render } from "react-dom";
import { HashRouter } from "react-router-dom";
import { initServiceWorker } from "./services/service-worker";
import App from "./components/App";

render(
  <HashRouter>
    <App/>
  </HashRouter>,
  document.getElementById("app")
);

if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
  initServiceWorker();
}
