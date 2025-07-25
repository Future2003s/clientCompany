import { NextRequest } from "next/server";

async function POST(request: NextRequest) {
  const res = await request.json();

  console.log(res);

  // const sessionToken = res.data.access_token;

  // if (!sessionToken) {
  //   return Response.json({
  //     message: "Không nhận được sessionToken",
  //   });
  // }

  // return Response.json(
  //   {
  //     res,
  //   },
  //   {
  //     headers: {
  //       "Set-Cookie": `sessionToken=${sessionToken}; HttpOnly; Secure; SameSite=Strict; Path=/;`,
  //     },
  //   }
  // );
}
