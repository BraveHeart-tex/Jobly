import SignInForm from "@/components/forms/auth/SignInForm";
import { validateRequest } from "@/lib/auth/validateRequest";
import { APP_NAME } from "@/lib/constants";
import { SHARED_ROUTES } from "@/lib/routes";
import { capitalizeWord } from "@/lib/utils";
import type { DBUser } from "@/server/db/schema/users";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

interface LoginPageSearchParams {
  portalType?: DBUser["role"];
}

interface LoginPageProps {
  searchParams: LoginPageSearchParams;
}

const LoginPage = async ({ searchParams }: LoginPageProps) => {
  const { user } = await validateRequest();
  if (user) {
    redirect(SHARED_ROUTES.HOME);
  }

  const portalType = searchParams.portalType ?? "candidate";

  return (
    <div className="grid h-screen w-full bg-muted/10 dark:bg-background lg:min-h-[600px] xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[90%] gap-4 max-w-[450px]">
          <div className="grid gap-2 text-center">
            <div className="mb-1 flex items-center justify-center">
              <Image
                src="/logo.svg"
                alt={`${APP_NAME} Logo`}
                width={60}
                height={60}
                priority
              />
            </div>
            <h1 className="text-3xl font-bold">
              {APP_NAME} - {capitalizeWord(portalType)} Login
            </h1>
          </div>
          <SignInForm portalType={portalType} />
          <div className="mt-1 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href={`${SHARED_ROUTES["SIGN-UP"]}?portalType=${portalType}`}
              className="underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
