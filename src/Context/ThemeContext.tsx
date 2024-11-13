import React, { createContext, useState } from "react";

interface ThemeContextType {
  toggleTheme: () => void;
  themeMode: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");
  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
  };
  return (
    <ThemeContext.Provider value={{ toggleTheme, themeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
