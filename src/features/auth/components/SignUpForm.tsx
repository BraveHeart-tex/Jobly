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
import type { RouterOutputs } from "@/lib/types";
import type { DBUser } from "@/server/db/schema/users";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";
import {
  type SignUpData,
  signUpValidator,
} from "@/validation/auth/signUpValidator";
import { useExtendedForm } from "@/lib/hook-form/useExtendedForm";
import { showSuccessToast } from "@/components/toastUtils";
import { useSignUp } from "@/features/auth/hooks/useSignUp";

interface SignUpFormProps {
  portalType?: DBUser["role"];
}

const SignUpForm = ({ portalType }: SignUpFormProps) => {
  const router = useRouter();
  const { isSignUpPending, signUp } = useSignUp();
  const form = useExtendedForm(signUpValidator, {
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });
  const [isPasswordFieldFocused, setIsPasswordFieldFocused] = useState(false);

  const onSettled = (data: RouterOutputs["auth"]["signUp"]) => {
    if (!data) return;

    const { success, message } = data;

    if (success) {
      showSuccessToast(message);
      router.refresh();
    }
  };

  const onSubmit = (values: SignUpData) => {
    if (isSignUpPending) return;

    signUp(
      {
        ...values,
        role: portalType ?? "candidate",
      },
      {
        onSettled: (data) => {
          if (!data) return;
          onSettled(data);
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-4"
      >
        <div className="grid grid-cols-2 gap-1">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
          <Button type="submit" className="w-full" disabled={isSignUpPending}>
            Sign Up
          </Button>
          {/* TODO: Add icon and url params */}
          {portalType === "candidate" && (
            <Button
              type="button"
              variant="outline"
              className="w-full"
              disabled={isSignUpPending}
            >
              Sign Up with Google
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default SignUpForm;
