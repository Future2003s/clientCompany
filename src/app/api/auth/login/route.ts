import { authApiRequest } from "@/apiRequests/auth";
import { LoginBodyType } from "@/app/shemaValidation/auth.schema";
import { LoginResType } from "@/types/types";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
export async function POST(request: Request) {
  const body = (await request.json()) as LoginBodyType;
  const cookieStore = await cookies();
  try {
    const payload = (await authApiRequest.sLogin(body)) as LoginResType;
    const {
      token: { access_token, refresh_token },
    } = payload.metaData;
    const decodedAcesstoken = jwt.decode(access_token) as { exp: number };
    const decodedRefreshtoken = jwt.decode(refresh_token) as { exp: number };
    cookieStore.set("accessToken", access_token, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      expires: new Date(decodedAcesstoken.exp * 1000),
    });
    cookieStore.set("refreshToken", refresh_token, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      expires: new Date(decodedRefreshtoken.exp * 1000),
    });
    return Response.json(payload);
  } catch (error) {
    console.log(error);
  }
}
