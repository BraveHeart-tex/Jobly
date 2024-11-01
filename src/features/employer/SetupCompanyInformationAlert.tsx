"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { EMPLOYER_ROUTES, SHARED_ROUTES } from "@/lib/routes";
import { useCurrentUserStore } from "@/lib/stores/useCurrentUserStore";
import { TriangleAlert, XIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";

const SetupCompanyInformationAlert = () => {
  const [closed, setClosed] = useState(false);
  const router = useRouter();
  const hasToSetupCompanyInformation = useCurrentUserStore(
    (state) =>
      state.user?.role === "employer" &&
      state.user?.hasToSetupCompanyInformation,
  );

  if (!hasToSetupCompanyInformation || closed) return null;

  const handleGoToSetup = () => {
    router.push(EMPLOYER_ROUTES.COMPANY_PROFILE);
  };

  return (
    <div className="fixed bottom-0 right-0 w-full p-4 sm:bottom-5 sm:right-5 sm:w-auto sm:max-w-lg lg:max-w-2xl">
      <Alert className="relative">
        <TriangleAlert className="h-4 w-4" />
        <AlertTitle className="text-base sm:text-lg">Heads Up</AlertTitle>
        <AlertDescription className="text-sm sm:text-base">
          In order to use our platform as an employer, you need to set up your
          company information.
          <p className="mt-2">
            If you accidentally registered as an employer go to{" "}
            <Link
              href={SHARED_ROUTES.ACCOUNT_SETTINGS}
              className="underline hover:text-primary"
            >
              account settings
            </Link>{" "}
            to change your role.
          </p>
        </AlertDescription>
        <div className="mt-4">
          <Button
            variant="secondary"
            onClick={handleGoToSetup}
            className="w-full sm:w-auto"
          >
            Go to setup
          </Button>
        </div>
      </Alert>
      <Button size="smallIcon" className="absolute top-2 right-2">
        <XIcon onClick={() => setClosed(true)} />
      </Button>
    </div>
  );
};
export default SetupCompanyInformationAlert;
