import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  cookieStore.delete("sessionToken");

  return new Response(JSON.stringify({ message: "Logged out" }), {
    status: 200,
  });
}
