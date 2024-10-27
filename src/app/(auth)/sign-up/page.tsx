import AuthPageContainer from "@/features/auth/components/AuthPageContainer";
import SignUpForm from "@/features/auth/components/SignUpForm";
import { cachedValidateRequest } from "@/lib/auth/validateRequest";
import { SHARED_ROUTES } from "@/lib/routes";
import type { DBUser } from "@/server/db/schema/users";
import Link from "next/link";
import { redirect } from "next/navigation";

interface SignUpPageSearchParams {
  portalType?: DBUser["role"];
}

interface SignUpPageProps {
  searchParams: SignUpPageSearchParams;
}

const SignUpPage = async ({ searchParams }: SignUpPageProps) => {
  const { user } = await cachedValidateRequest();

  if (user) {
    redirect(SHARED_ROUTES.HOME);
  }

  const portalType = searchParams.portalType ?? "candidate";

  return (
    <AuthPageContainer portalType={portalType} authType="Sign Up">
      <SignUpForm portalType={portalType} />
      <div className="mt-1 text-center text-sm">
        Already have an account?{" "}
        <Link
          href={`${SHARED_ROUTES.LOGIN}?portalType=${portalType}`}
          className="underline"
        >
          Log in
        </Link>
      </div>
    </AuthPageContainer>
  );
};

export default SignUpPage;
