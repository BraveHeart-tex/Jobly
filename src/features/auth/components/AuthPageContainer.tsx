import { APP_NAME } from "@/lib/constants";
import { capitalizeWord } from "@/lib/utils/string";
import Image from "next/image";
import type React from "react";

interface AuthPageContainerProps extends React.PropsWithChildren {
  portalType: string;
  authType?: "Login" | "Sign Up";
}

const AuthPageContainer = ({
  portalType,
  children,
  authType = "Login",
}: AuthPageContainerProps) => {
  return (
    <div className="grid h-screen w-full bg-muted/10 dark:bg-background lg:min-h-[600px] xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[90%] max-w-[450px] gap-6">
          <div className="grid gap-2 text-center">
            <div className="mb-1 flex items-center justify-center">
              <Image
                src="/logo.svg"
                alt={`${APP_NAME} Logo`}
                width={60}
                height={60}
                priority
              />
            </div>
            <h1 className="text-3xl font-bold">
              {APP_NAME} - {capitalizeWord(portalType)} {authType}
            </h1>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthPageContainer;
