import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const payload = await request.json();

  const sessionToken = payload.data.access_token;

  return Response.json(
    { payload },
    {
      headers: {
        "Set-Cookie": `sessionToken=${sessionToken};path=/;httpOnly;Secure`,
      },
    }
  );
}
