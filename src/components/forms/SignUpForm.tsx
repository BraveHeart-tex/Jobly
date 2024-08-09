"use client";
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
import { useExtendedForm } from "@/lib/hook-form";
import { type SignUpSchema, signUpSchema } from "@/schemas/signUpSchema";
import type { DBUser } from "@/server/db/schema/users";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { RouterOutputs } from "trpc-router-types";

type SignUpFormProps = {
  portalType?: DBUser["role"];
};

const SignUpForm = ({ portalType }: SignUpFormProps) => {
  const router = useRouter();
  const { isPending, mutate: signUpUser } = api.auth.signUp.useMutation();
  const form = useExtendedForm<SignUpSchema>(signUpSchema);

  const handlePasswordError = (error: string, message: string) => {
    toast.error(error);
    form.setError("password", { message }, { shouldFocus: true });
  };

  const onSettled = (data: RouterOutputs["auth"]["signUp"]) => {
    if (!data) return;

    const { error, isPasswordPwned, isWeakPassword, success, message } = data;

    if (error) {
      if (isPasswordPwned) {
        handlePasswordError(
          error,
          "This password was detected in data breaches. Please use a different password.",
        );
        return;
      }

      if (isWeakPassword) {
        handlePasswordError(error, error);
        return;
      }
    }

    if (success) {
      toast.success(message);
      router.refresh();
    }
  };

  const onSubmit = (values: SignUpSchema) => {
    if (isPending) return;

    signUpUser(
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
                <Input type="password" placeholder="******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 gap-4">
          <Button type="submit" className="w-full" disabled={isPending}>
            Sign Up
          </Button>
          {portalType === "candidate" && (
            <Button
              type="button"
              variant="outline"
              className="w-full"
              disabled={isPending}
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
