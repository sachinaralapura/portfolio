import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ThemeContextProvider from "./Context/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/portfolio/sachin">
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
