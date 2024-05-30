import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import MotionDiv from "@/components/animations/MotionDiv";

export default function Page() {
  return (
    <div className="flex min-h-screen lg:items-center justify-center bg-card">
      <MotionDiv
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, type: "tween" }}
        className="bg-primary/90 lg:rounded-md lg:shadow-lg max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 w-full"
      >
        <div className="flex flex-col lg:items-start p-4 lg:p-8 items-center justify-center h-full lg:h-auto">
          <Image src="/logo.svg" alt="Jobly Logo" width={200} height={200} className="mb-2 dark:invert invert-[1]" />
          <div className="flex flex-col gap-1 lg:mt-auto text-center lg:text-start">
            <h2 className="scroll-m-20  text-3xl font-semibold tracking-tight text-primary-foreground">Welcome!</h2>
            <span className="text-primary-foreground/90">Log in to access your account</span>
          </div>
        </div>
        <div className="bg-card flex items-center justify-center min-h-[500px]">
          <SignIn />
        </div>
      </MotionDiv>
    </div>
  );
}
