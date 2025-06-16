import React from "react";

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="container mx-auto mt-25">{children}</div>;
}
