"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
<<<<<<< HEAD
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
=======
import { createContext } from "vm";
>>>>>>> 276a6ae18ebb88490169a9dd0533c52a67c791b3

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
