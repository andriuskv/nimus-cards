import "normalize.css";

import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { initServiceWorker } from "./services/service-worker";

import "./styles/base.css";

import App from "./components/App";

const root = createRoot(document.getElementById("root"));

root.render(
  <HashRouter>
    <App/>
  </HashRouter>
);

if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
  initServiceWorker();
}
