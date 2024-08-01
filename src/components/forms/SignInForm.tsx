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
import { type SignInSchema, signInSchema } from "@/schemas/signInSchema";
import type { User } from "@/server/db/schema";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import type { RouterOutputs } from "trpc-router-types";
import { toast } from "sonner";

type SignInFormProps = {
  portalType?: User["role"];
};

const SignInForm = ({ portalType }: SignInFormProps) => {
  const form = useExtendedForm<SignInSchema>(signInSchema);
  const router = useRouter();
  const { isPending, mutate: signIn } = api.auth.signIn.useMutation();

  const onSettled = (data: RouterOutputs["auth"]["signIn"]) => {
    const { error, success } = data;

    if (error) {
      toast.error(error);
      return;
    }

    if (success) {
      toast.success("You have successfully signed in");
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
                <Input type="password" placeholder="******" {...field} />
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
