import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const payload = await request.json();

  return Response.json(
    { payload },
    {
      headers: {
        "Set-Cookie": `sessionToken=${payload.payload.data.access_token};Path=/;HttpOnly;Samesite=Strict;Secure`,
      },
    }
  );
}
