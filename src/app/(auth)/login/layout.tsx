import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return <div className="mt-20 container mx-auto">{children}</div>;
}

export default layout;
