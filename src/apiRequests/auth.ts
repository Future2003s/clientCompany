import { http } from "@/lib/http";

export const authApiRequest = {
  login: (body: any) => http.post("/login", body),
};
