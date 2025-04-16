import { Theme } from "@emotion/react";
import { createTheme, PaletteMode, ThemeProvider } from "@mui/material";
import React, { createContext, useContext, useMemo, useState } from "react";
import { useData } from "./DataContext";
import { ThemeContextType } from "../utils/type";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
  const context: ThemeContextType | undefined = useContext<ThemeContextType | undefined>(
    ThemeContext
  );

  if (!context) throw new Error("useThemeContext must be used within ThemeContextProvider");
  return context;
};

const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { fontFamily } = useData();
  const [themeMode, setThemeMode] = useState<PaletteMode>("light");
  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme: Theme = useMemo<Theme>(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
          // primary: {
          //   main: "#2cdce6",
          // },
        },
        typography: {
          fontFamily: `${fontFamily}, "Roboto", "Helvetica", "Arial", sans-serif`,
        },
      }),
    [themeMode, fontFamily]
  );

  return (
    <ThemeContext.Provider value={{ toggleTheme, themeMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
