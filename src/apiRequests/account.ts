import http from "@/lib/http";

const accountApiRequest = {
  me: (sessionToken: string) => {
    return http.get<any>("/api/account/me", {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    });
  },
};

export default accountApiRequest;
