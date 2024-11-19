import { createContext, useContext } from "react";
import Data from "../data.json";
import { DataType } from "../utils/type";

const DataContext = createContext<DataType | undefined>(undefined);

export const useData = () => {
  const context: DataType | undefined = useContext<DataType | undefined>(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <DataContext.Provider value={Data}>{children}</DataContext.Provider>;
};

export default DataProvider;
