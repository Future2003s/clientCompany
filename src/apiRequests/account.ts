import { http } from "@/lib/http";

const accountApiRequest = {
  me: (sessionToken: string) => {
    return http.get("/api/account/me", {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    });
  },
};

export default accountApiRequest;
