export async function POST(request: Request) {
  const res = await request.json();

  const sessionId = res?.metaData.token.access_token;
  return Response.json(
    { payload: res },
    {
      headers: {
        "Set-Cookie": `sessionId=${sessionId};HttpOnly;Path=/`,
      },
    }
  );
}
