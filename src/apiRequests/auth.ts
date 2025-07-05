import { http } from "@/lib/http";
import { LoginResType } from "@/types/types";

export const authApiRequest = {
  // sLogin là của server backend
  sLogin: (body: any) => http.post<LoginResType>("/auth/login", body),
  // cLogin là của server next
  cLogin: (body: any) => http.post("/api/auth/login", body),
  login: (body: any) => http.post("/auth/login", body),
};
