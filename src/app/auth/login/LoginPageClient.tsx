'use client';
import { useState } from "react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import AppLogo from "@/app/assets/logo.svg";
import { SignInResponse, signIn } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { showErrorToast, showToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const LoginPageClient = () => {
  const [loading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback: SignInResponse | undefined) => {
      setIsLoading(false);

      if (callback?.ok) {
        showToast({
          title: "Sign in successful.",
          description: "Welcome back!",
        });
        router.push("/dashboard");
      }
      if (callback?.error) {
        showErrorToast({
          title: "Sign in failed, please try again.",
          description: "Invalid email or password.",
        });
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-facebook dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-md shadow-lg max-w-[400px] w-full">
        <div className="flex flex-col items-center mb-4">
          <Image src={AppLogo} alt="Jobly Logo" width={200} className="mb-2 dark:invert-1" />
          <h2 className="text-3xl font-semibold text-center mb-2 text-facebook dark:text-foreground">Welcome!</h2>
          <span className="text-md text-foreground dark:text-foreground/70">Log in to access your account</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <Input
              className="rounded-md border-gray-300 dark:border-gray-700 focus:border-facebook dark:focus:border-facebook"
              id="email"
              type="email"
              placeholder="Email"
              required
              {...register("email", {
                required: "Email is required",
              })}
            />
            <Input
              id="password"
              type="password"
              placeholder="Password"
              className="rounded-md border-gray-300 dark:border-gray-700 focus:border-facebook dark:focus:border-facebook"
              required
              {...register("password", {
                required: "Password is required",
              })}
            />
            <Button
              className="text-white bg-facebook text-md dark:bg-gray-700 hover:bg-facebook-400 dark:hover:bg-gray-900 rounded-md font-semibold"
              type="submit"
              disabled={loading}
            >
              Sign In
            </Button>
            <hr />
            <Button
              variant={"outline"}
              className="rounded-md text-[15px] md:text-[17px] lg:text-[18px] flex items-center gap-2 dark:hover:bg-gray-900"
              size="lg"
              type="button"
              onClick={() =>
                signIn("google", {
                  callbackUrl: "/",
                  redirect: true,
                })
              }
              disabled={loading}
            >
              <FcGoogle />
              Sign In with Google
            </Button>
            <p className="text-center mt-4">
              Don&apos;t have an account?{" "}
              <Link className="text-facebook-600 dark:text-yellow-400" href="/auth/signup">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPageClient;
