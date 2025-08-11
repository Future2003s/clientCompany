"use client";
import { useAppContextProvider } from "@/context/app-context";
import React from "react";

export default function page() {
  const { sessionToken } = useAppContextProvider();
  return <div className="mt-25">page,{sessionToken}</div>;
}
