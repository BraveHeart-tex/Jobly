import AuthPageContainer from "@/features/auth/components/AuthPageContainer";
import LoginForm from "@/features/auth/components/LoginForm";
import { validateRequest } from "@/lib/auth/validateRequest";
import { SHARED_ROUTES } from "@/lib/routes";
import type { DBUser } from "@/server/db/schema/users";
import Link from "next/link";
import { redirect } from "next/navigation";

interface LoginPageSearchParams {
  portalType?: DBUser["role"];
}

interface LoginPageProps {
  searchParams: Promise<LoginPageSearchParams>;
}

const LoginPage = async (props: LoginPageProps) => {
  const searchParams = await props.searchParams;
  const { user } = await validateRequest();
  if (user) {
    redirect(SHARED_ROUTES.HOME);
  }

  const portalType = searchParams.portalType ?? "candidate";

  return (
    <AuthPageContainer portalType={portalType}>
      <LoginForm portalType={portalType} />
      <div className="mt-1 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link
          href={`${SHARED_ROUTES["SIGN-UP"]}?portalType=${portalType}`}
          className="underline"
        >
          Sign up
        </Link>
      </div>
    </AuthPageContainer>
  );
};

export default LoginPage;
