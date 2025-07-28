"use client";
import { createContext, useState, ReactNode, useContext } from "react";

const AppContext = createContext({
  sessionToken: "",
  setSessionToken: (sessionToken: string) => {},
});

export const useAppProviderContext = () => {
  const context = useContext(AppContext);

  return context;
};

export const AppProviderContext = ({
  children,
  initialSessionToken,
}: {
  children: ReactNode;
  initialSessionToken: string | undefined;
}) => {
  const [sessionToken, setSessionToken] = useState<string>("");

  return (
    <AppContext.Provider value={{ sessionToken, setSessionToken }}>
      {children}
    </AppContext.Provider>
  );
};
