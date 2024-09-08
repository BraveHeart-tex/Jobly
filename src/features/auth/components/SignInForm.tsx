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
import { useExtendedForm } from "@/lib/hook-form/useExtendedForm";
import { SHARED_ROUTES } from "@/lib/routes";
import type { RouterOutputs } from "@/lib/types";
import { type SignInSchema, signInSchema } from "@/schemas/auth/signInSchema";
import type { DBUser } from "@/server/db/schema/users";
import { api } from "@/trpc/react";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";
import { toast } from "sonner";

interface SignInFormProps {
  portalType?: DBUser["role"];
}

const SignInForm = ({ portalType }: SignInFormProps) => {
  const form = useExtendedForm<SignInSchema>(signInSchema);
  const router = useRouter();
  const { isPending, mutate: signIn } = api.auth.signIn.useMutation();
  const [isPasswordFieldFocused, setIsPasswordFieldFocused] = useState(false);

  const onSettled = (data: RouterOutputs["auth"]["signIn"]) => {
    const { error, success } = data;
    if (error) {
      toast.error(error);
      return;
    }

    if (success) {
      toast.success("You have successfully signed in");
      router.push(SHARED_ROUTES.HOME);
      router.refresh();
    }
  };

  const onSubmit = (values: SignInSchema) => {
    if (isPending) return;
    signIn(values, {
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
          <Button type="submit" className="w-full" disabled={isPending}>
            Sign In
          </Button>
          {portalType === "candidate" && (
            <Button
              type="button"
              variant="outline"
              className="w-full"
              disabled={isPending}
            >
              Sign In with Google
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default SignInForm;
