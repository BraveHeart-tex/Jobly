'use client';
import AppLogo from "@/app/assets/logo.svg";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/actions";
import { showErrorToast, showToast } from "@/components/ui/use-toast";
import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import RegisterUserSchema, { RegisterUserSchemaType } from "@/schemas/RegisterUserSchema";
import { FaCheck } from "react-icons/fa";
import { cn } from "@/lib/utils";

const SignUpPageClient = () => {
  const router = useRouter();
  let [isPending, startTransition] = useTransition();
  const [selectedInput, setSelectedInput] = useState("");

  const form = useForm<RegisterUserSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(RegisterUserSchema),
  });

  const onSubmit = async (data: RegisterUserSchemaType) => {
    startTransition(async () => {
      const result = await registerUser(data);
      if (result?.error) {
        showErrorToast({
          title: "Error",
          description: result.error,
        });
      } else {
        router.push("/auth/login");
        showToast({
          title: "Successfully signed up.",
          description: "Your account has been created.You can now login.",
        });
      }
    });
  };

  useEffect(() => {
    if (selectedInput === "password") {
    }
  }, [selectedInput]);

  const passwordRules: {
    [key: string]: (password: string) => boolean;
  } = {
    "At least 8 characters": (password: string) => password.length >= 8,
    "One lowercase letter": (password: string) => /[a-z]/.test(password),
    "One uppercase letter": (password: string) => /[A-Z]/.test(password),
    "One number": (password: string) => /[0-9]/.test(password),
  };

  const checkedControl = (control: string, password: string) => {
    const ruleFunction = passwordRules[control];
    return ruleFunction ? ruleFunction(password) : false;
  };

  const passwordCheckList = (
    <div className="text-sm space-y-1 flex flex-col items-start absolute 2xl:top-[51%] 2xl:left-[25%] top-0 left-0 bottom-0 bg-facebook text-white dark:bg-primary border rounded-md h-max p-4 py-2">
      Your password should contain:
      <ul className="pl-4 flex flex-col gap-1">
        {Object.keys(passwordRules).map((rule) => (
          <li
            key={rule}
            className={cn(
              "flex items-center gap-2 group",
              checkedControl(rule, form.watch("password")) && "text-green-500 valid"
            )}
          >
            <FaCheck className="hidden group-[.valid]:block" /> {rule}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-facebook dark:bg-gray-900 p-4 relative">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-md shadow-lg max-w-[400px] w-full">
        <div className="flex flex-col items-center mb-4">
          <Image src={AppLogo} alt="Jobly Logo" width={200} className="dark:invert-1 mb-2" />
          <h2 className="text-center mb-2 text-facebook font-semibold text-2xl dark:text-gray-100">
            Create an Account
          </h2>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel className="text-foreground">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel className="text-foreground">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@email.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel className="text-foreground">Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your password"
                      type="password"
                      {...field}
                      onFocus={() => {
                        setSelectedInput("password");
                      }}
                      onBlur={() => {
                        setSelectedInput("");
                      }}
                      autoComplete={"false"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {selectedInput === "password" && passwordCheckList}
            <Button
              className="text-white bg-facebook dark:bg-gray-700 hover:bg-facebook-400 text-lg dark:hover:bg-gray-700 rounded-md font-semibold"
              size="lg"
              type="submit"
              disabled={isPending}
            >
              Sign Up
            </Button>
            <hr className="mt-4" />
            <div className="flex flex-col gap-4 text-foreground mt-4">
              <Button
                variant={"outline"}
                className="rounded-md text-[15px] md:text-[17px] lg:text-[18px] flex items-center gap-2"
                size="lg"
                onClick={() =>
                  signIn("google", {
                    callbackUrl: "/dashboard",
                  })
                }
                disabled={isPending}
              >
                <FcGoogle /> Sign Up with Google
              </Button>
              <p className="text-center mt-4">
                Already have an account?{" "}
                <Link className="text-facebook-600 dark:yellow-400" href="/auth/login">
                  Log In
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignUpPageClient;
