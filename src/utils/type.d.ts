import Data from "../data.json";

interface project {
  projectProps: (typeof Data.projects)[number];
}

interface ThemeContextType {
  toggleTheme: () => void;
  themeMode: PaletteMode;
}

export { project, ThemeContextType };
