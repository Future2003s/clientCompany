import React from "react";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="container mx-auto mt-10">{children}</div>;
}
