import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface AppContextInterface {
  theme: {
    color: string;
    bgColor: string;
  };
  setTheme: Dispatch<
    SetStateAction<{
      color: string;
      bgColor: string;
    }>
  >;
  isNavbarOpen: boolean;
  setIsNavbarOpen: Dispatch<SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextInterface | null>(null);

export function ContextProvider({ children }) {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [theme, setTheme] = useState({ color: "ffffff", bgColor: "000000" });
  const defaultContext: AppContextInterface = {
    theme: theme,
    setTheme: setTheme,
    isNavbarOpen: isNavbarOpen,
    setIsNavbarOpen: setIsNavbarOpen,
  };

  return (
    <AppContext.Provider value={defaultContext}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
