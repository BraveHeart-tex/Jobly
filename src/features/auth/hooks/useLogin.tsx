import { api } from "@/trpc/react";

export const useLogin = () => {
  const { isPending: isLoggingIn, mutate: login } =
    api.auth.login.useMutation();

  return { isLoggingIn, login };
};
