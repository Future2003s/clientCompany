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
<<<<<<< HEAD
  initialSessionToken = "",
}: {
  children: React.ReactNode;
  initialSessionToken?: string;
=======
}: {
  children: React.ReactNode;
>>>>>>> 276a6ae18ebb88490169a9dd0533c52a67c791b3
}) {
  const [sessionId, setSessionId] = useState<string>("");

  return (
    <AppContext.Provider value={{ sessionId, setSessionId }}>
      {children}
    </AppContext.Provider>
  );
}
