"use client";
import { Input } from "@/components/ui/input";
import { type SignUpSchema, signUpSchema } from "@/schemas/signUpSchema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useExtendedForm } from "@/lib/hook-form";

type SignUpFormProps = {
  portalType?: "employer" | "employee";
};

const SignUpForm = ({ portalType }: SignUpFormProps) => {
  const form = useExtendedForm<SignUpSchema>(signUpSchema);

  const onSubmit = (values: SignUpSchema) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
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
                <Input type="email" placeholder="example@email.com" {...field} />
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
                <Input type="password" placeholder="Your secure password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 gap-4">
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
          {portalType === "employee" && (
            <Button type="button" variant="outline" className="w-full">
              Sign Up with Google
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default SignUpForm;
