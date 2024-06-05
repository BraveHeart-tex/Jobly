import React from "react";
import { validateRequest } from "@/lib/auth/validate-request";
import { redirect } from "next/navigation";
import { contentByPortalType, ROUTES } from "@/lib/constants";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { generateRandomNumber } from "@/lib/utils";

type SignUpPageSearchParams = {
  portalType?: "employer" | "employee";
};

type SignUpPageProps = {
  searchParams: SignUpPageSearchParams;
};

const SignUpPage = async ({ searchParams }: SignUpPageProps) => {
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
          className="size-[500px] dark:invert"
        />
        <h2 className="scroll-m-20 text-center text-2xl font-semibold tracking-tight">{supportiveHeading}</h2>
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6 lg:w-[400px]">
          <div className="grid gap-2 text-center">
            <div className="mb-4 flex items-center justify-center">
              <Image src="/logo.svg" alt="Jobly Logo" width={60} height={60} />
            </div>
            <h1 className="text-3xl font-bold">Sign Up to Jobly {portalType === "employer" && "for employers"}</h1>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href={ROUTES.FORGOT_PASSWORD} className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
            {portalType === "employee" && (
              <Button variant="outline" className="w-full">
                Sign Up with Google
              </Button>
            )}
          </div>
          <div className="mt-1 text-center text-sm">
            Already have an account?{" "}
            <Link href={ROUTES.LOGIN + `?portalType=${portalType}`} className="underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
