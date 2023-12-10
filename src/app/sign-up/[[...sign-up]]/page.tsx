import { SignUp } from "@clerk/nextjs";
import Image from "next/image";
import AppLogo from "@/app/assets/logo.svg";
import "@/app/cardStyles.css";

export default function Page() {
  return (
    <div className="flex min-h-screen lg:items-center justify-center bg-card dark:bg-gray-900">
      <div className="bg-facebook dark:bg-gray-800 lg:rounded-md lg:shadow-lg max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 w-full">
        <div className="flex flex-col lg:items-start p-4 lg:p-8 items-center h-max lg:h-auto">
          <Image src={AppLogo} alt="Jobly Logo" width={200} className="mb-2 dark:invert invert-[1]" />
          <div className="flex flex-col gap-1 lg:mt-auto">
            <h2 className="text-3xl font-semibold mb-2 text-gray-50 dark:text-foreground">Welcome!</h2>
            <span className="text-md text-gray-200 dark:text-foreground/70">Sign up to create an account</span>
          </div>
        </div>
        <div className="dark:bg-gray-900 bg-card flex items-center justify-center">
          <SignUp />
        </div>
      </div>
    </div>
  );
}
