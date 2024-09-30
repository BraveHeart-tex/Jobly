import { api } from "@/trpc/react";

export const useSignUp = () => {
  const { isPending: isSignUpPending, mutate: signUp } =
    api.auth.signUp.useMutation();

  return { isSignUpPending, signUp };
};
