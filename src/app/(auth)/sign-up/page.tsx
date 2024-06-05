import React from "react";
import { validateRequest } from "@/lib/auth/validate-request";
import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/constants";

const SignUpPage = async () => {
  const { user } = await validateRequest();

  if (user) {
    redirect(ROUTES.HOME);
  }

  return <div>SignUpPage</div>;
};

export default SignUpPage;
