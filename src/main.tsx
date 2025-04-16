import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ThemeContextProvider from "./Context/ThemeContext";
import { CssBaseline } from "@mui/material";
import DataProvider from "./Context/DataContext";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <CssBaseline />
    <DataProvider>
      <BrowserRouter basename={`/portfolio`}>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </BrowserRouter>
    </DataProvider>
  </React.StrictMode>
);
