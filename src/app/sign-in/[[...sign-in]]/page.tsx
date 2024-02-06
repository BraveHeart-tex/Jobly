import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import AppLogo from "@/app/assets/logo.svg";
import "@/app/cardStyles.css";
import MotionDiv from "@/app/animations/MotionDiv";

export default function Page() {
  return (
    <div className="flex min-h-screen lg:items-center justify-center bg-card dark:bg-gray-900">
      <MotionDiv
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, type: "tween" }}
        className="bg-facebook dark:bg-gray-800 lg:rounded-md lg:shadow-lg max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 w-full"
      >
        <div className="flex flex-col lg:items-start p-4 lg:p-8 items-center justify-center h-full lg:h-auto">
          <Image src={AppLogo} alt="Jobly Logo" width={200} className="mb-2 dark:invert invert-[1]" />
          <div className="flex flex-col gap-1 lg:mt-auto">
            <h2 className="text-3xl font-semibold mb-2 text-gray-50 dark:text-foreground" data-testid="sign-in-title">
              Welcome!
            </h2>
            <span className="text-md text-gray-200 dark:text-foreground/70" data-testid="sign-in-message">
              Log in to access your account
            </span>
          </div>
        </div>
        <div className="dark:bg-gray-900 bg-card flex items-center justify-center min-h-[500px]">
          <SignIn />
        </div>
      </MotionDiv>
    </div>
  );
}
