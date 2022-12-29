import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

import App from "./App";
import "./index.css";

if (localStorage.user) axios.defaults.headers.Authorization = localStorage.user;

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
