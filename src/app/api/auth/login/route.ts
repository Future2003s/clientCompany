import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const payload = await request.json();

  const sessionToken = payload.data.access_token;

  const isProd = process.env.NODE_ENV === "production";
  const cookieAttributes = [
    `sessionToken=${sessionToken}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
  ];
  if (isProd) cookieAttributes.push("Secure");

  return Response.json(
    { payload },
    {
      headers: {
        "Set-Cookie": cookieAttributes.join("; "),
      },
    }
  );
}
