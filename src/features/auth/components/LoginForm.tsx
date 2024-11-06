"use client";
import CapsLockIndicator from "@/components/common/CapsLockIndicator";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SHARED_ROUTES } from "@/lib/routes";
import type { DBUser } from "@/server/db/schema/users";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";
import {
  type LoginData,
  type LoginResponse,
  loginValidator,
} from "@/validation/auth/loginValidator";
import { useExtendedForm } from "@/lib/hook-form/useExtendedForm";
import { showErrorToast, showSuccessToast } from "@/components/toastUtils";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { cn } from "@/lib/utils";
import GoogleIcon from "@/components/icons/GoogleIcon";

interface LoginFormProps {
  portalType?: DBUser["role"];
}

const LoginForm = ({ portalType }: LoginFormProps) => {
  const form = useExtendedForm<LoginData>(loginValidator, {
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const { isLoggingIn, login } = useLogin();
  const [isPasswordFieldFocused, setIsPasswordFieldFocused] = useState(false);

  const onSettled = (data: LoginResponse) => {
    if ("error" in data) {
      showErrorToast(data?.error);
      return;
    }

    if ("success" in data) {
      showSuccessToast("You have successfully signed in");
      router.push(SHARED_ROUTES.HOME);
      router.refresh();
    }
  };

  const onSubmit = (values: LoginData) => {
    if (isLoggingIn) return;
    login(values, {
      onSettled: (data) => {
        if (!data) return;
        onSettled(data);
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="example@email.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type="password"
                    placeholder="******"
                    onFocus={() => {
                      setIsPasswordFieldFocused(true);
                    }}
                    {...field}
                    onBlur={() => {
                      field.onBlur();
                      setIsPasswordFieldFocused(false);
                    }}
                  />
                  {isPasswordFieldFocused ? <CapsLockIndicator /> : null}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 gap-4">
          <Button type="submit" className="w-full" disabled={isLoggingIn}>
            Sign In
          </Button>
          {portalType === "candidate" && (
            <a
              href={`/api/login/google?portalType=${portalType}`}
              className={cn(
                buttonVariants({
                  variant: "outline",
                  className: "w-full",
                }),
              )}
            >
              <GoogleIcon className="mr-2 h-4 w-4" />
              Sign In with Google
            </a>
          )}
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
