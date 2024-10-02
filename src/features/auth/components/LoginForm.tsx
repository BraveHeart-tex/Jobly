"use client";
import CapsLockIndicator from "@/components/common/CapsLockIndicator";
import { Button } from "@/components/ui/button";
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
import { toast } from "sonner";
import { useLogin } from "../hooks/useLogin";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import {
  type LoginData,
  type LoginResponse,
  LoginValidator,
} from "@/validators/auth/loginValidator";

interface LoginFormProps {
  portalType?: DBUser["role"];
}

const LoginForm = ({ portalType }: LoginFormProps) => {
  const form = useForm<LoginData>({
    resolver: valibotResolver(LoginValidator),
  });
  const router = useRouter();
  const { isLoggingIn, login } = useLogin();
  const [isPasswordFieldFocused, setIsPasswordFieldFocused] = useState(false);

  const onSettled = (data: LoginResponse) => {
    if ("error" in data) {
      toast.error(data?.error);
      return;
    }

    if ("success" in data) {
      toast.success("You have successfully signed in");
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
            <Button
              type="button"
              variant="outline"
              className="w-full"
              disabled={isLoggingIn}
            >
              Sign In with Google
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
