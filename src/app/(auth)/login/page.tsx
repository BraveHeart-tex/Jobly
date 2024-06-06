import Image from "next/image";
import Link from "next/link";
import { generateRandomNumber } from "@/lib/utils";
import { contentByPortalType, ROUTES } from "@/lib/constants";
import SignInForm from "@/components/forms/SignInForm";
import { validateRequest } from "@/lib/auth/validate-request";
import { redirect } from "next/navigation";

type LoginPageSearchParams = {
  portalType?: "employer" | "employee";
};

type LoginPageProps = {
  searchParams: LoginPageSearchParams;
};

const LoginPage = async ({ searchParams }: LoginPageProps) => {
  const { user } = await validateRequest();
  if (user) {
    redirect(ROUTES.HOME);
  }

  const portalType = searchParams.portalType ?? "employee";
  const contentIndex = generateRandomNumber(1, 4);
  const supportiveHeading = contentByPortalType[portalType][contentIndex - 1] as string;

  return (
    <div className="grid h-screen w-full bg-muted/10 dark:bg-background lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="hidden size-full flex-col items-center justify-center lg:flex">
        <Image
          src={`/illustrations/${portalType}/${portalType}-${contentIndex}.svg`}
          alt={supportiveHeading}
          width={1920}
          height={1080}
          className="size-[500px]"
        />
        <h2 className="scroll-m-20 text-center text-2xl font-semibold tracking-tight">{supportiveHeading}</h2>
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-4 lg:w-[400px]">
          <div className="grid gap-2 text-center">
            <div className="mb-4 flex items-center justify-center">
              <Image src="/logo.svg" alt="Jobly Logo" width={60} height={60} />
            </div>
            <h1 className="text-3xl font-bold">Sign in to Jobly {portalType === "employer" && "for employers"}</h1>
          </div>
          <SignInForm portalType={portalType} />
          <div className="mt-1 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href={ROUTES["SIGN-UP"] + `?portalType=${portalType}`} className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
