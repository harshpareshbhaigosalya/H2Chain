import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/globals.css";

// Ensure dark is default (so initial is dark)
const docEl = document.documentElement;
if (!localStorage.getItem("theme")) {
  docEl.classList.add("dark");
  localStorage.setItem("theme", "dark");
} else {
  if (localStorage.getItem("theme") === "dark") docEl.classList.add("dark");
  else docEl.classList.remove("dark");
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
