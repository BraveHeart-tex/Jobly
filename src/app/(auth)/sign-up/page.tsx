import SignUpForm from "@/components/forms/SignUpForm";
import { validateRequest } from "@/lib/auth/validate-request";
import { APP_NAME, contentByPortalType } from "@/lib/constants";
import { SHARED_ROUTES } from "@/lib/routes";
import { generateRandomNumber } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

type SignUpPageSearchParams = {
  portalType?: "employer" | "employee";
};

type SignUpPageProps = {
  searchParams: SignUpPageSearchParams;
};

const SignUpPage = async ({ searchParams }: SignUpPageProps) => {
  const { user } = await validateRequest();

  if (user) {
    redirect(SHARED_ROUTES.HOME);
  }

  const portalType = searchParams.portalType ?? "employee";
  const contentIndex = generateRandomNumber(1, 4);
  const supportiveHeading = contentByPortalType[portalType][
    contentIndex - 1
  ] as string;

  return (
    <div className="grid h-screen w-full bg-muted/10 dark:bg-background lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="hidden size-full flex-col items-center justify-center lg:flex">
        <Image
          src={`/illustrations/${portalType}/${portalType}-${contentIndex}.svg`}
          alt={supportiveHeading}
          width={1920}
          height={1080}
          className="size-[500px]"
          priority
        />
        <h2 className="scroll-m-20 text-center text-2xl font-semibold tracking-tight">
          {supportiveHeading}
        </h2>
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[90%] max-w-[450px] gap-6">
          <div className="grid gap-2 text-center">
            <div className="mb-1 flex items-center justify-center">
              <Image
                src="/logo.svg"
                alt={`${APP_NAME} Logo`}
                width={60}
                height={60}
              />
            </div>
            <h1 className="text-3xl font-bold">
              Sign Up to {APP_NAME}{" "}
              {portalType === "employer" && (
                <span className="text-primary">for employers</span>
              )}
            </h1>
          </div>
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
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
