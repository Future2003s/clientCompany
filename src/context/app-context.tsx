"use client";
import { createContext, ReactNode, useContext, useState } from "react";

const AppContextProvider = createContext({
  sessionToken: "",
  setSessionToken: {},
});

export const useAppContextProvider = () => {
  return useContext(AppContextProvider);
};

export default function AppContext({
  children,
  initialSessionToken,
}: {
  children: ReactNode;
  initialSessionToken: string;
}) {
  const [sessionToken, setSessionToken] = useState(initialSessionToken);
  return (
    <AppContextProvider.Provider value={{ sessionToken, setSessionToken }}>
      {children}
    </AppContextProvider.Provider>
  );
}
