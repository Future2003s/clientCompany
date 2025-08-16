import { useAppContextProvider } from "@/context/app-context";
import { cookies } from "next/headers";
import React from "react";

export default function Page() {
  const { setSessionToken } = useAppContextProvider();

  return <div className="mt-25"></div>;
}
