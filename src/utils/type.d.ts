import Data from "../data.json";

export type DataType = typeof Data;
interface project {
  projectProps: (typeof Data.projects)[number];
}

interface ThemeContextType {
  toggleTheme: () => void;
  themeMode: PaletteMode;
}

type formDataType = { name: string; email: string; message: string };

/**
 * -1 - There is error message to display
 *  0 - No message to display
 * +1 - There is a success message to display
 */
type SnackMessageType = -1 | 0 | 1;

interface SnackMessage {
  messageType: SnackMessageType;
  message?: string;
}

export { DataType, project, ThemeContextType, formDataType, SnackMessage };
