"use client";
import React, { createContext, useContext, useState } from "react";

const AppContext = createContext({
  sessionId: "",
  setSessionId: (sessionId: string) => {},
});

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("LOI CONTEXT");
  }
  return context;
};

export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sessionId, setSessionId] = useState<string>("");

  return (
    <AppContext.Provider value={{ sessionId, setSessionId }}>
      {children}
    </AppContext.Provider>
  );
}
