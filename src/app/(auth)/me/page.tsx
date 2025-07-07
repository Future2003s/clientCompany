import { cookies } from "next/headers";
import React from "react";

export default async function page() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId");
  console.log(sessionId?.value);
  return <div>page</div>;
}
