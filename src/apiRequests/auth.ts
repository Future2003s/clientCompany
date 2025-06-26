import { http } from "@/lib/http";

export const authApiRequest = {
  login: (body: any) => http.post("http://localhost:4000/v1/api/login", body),
};
