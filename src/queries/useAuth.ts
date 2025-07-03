import { authApiRequest } from "@/apiRequests/auth";
import { useMutation } from "@tanstack/react-query";

const useLoginMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.login,
  });
};

export { useLoginMutation };
