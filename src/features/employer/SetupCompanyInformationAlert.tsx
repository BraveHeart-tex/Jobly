"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { EMPLOYER_ROUTES, SHARED_ROUTES } from "@/lib/routes";
import { useCurrentUserStore } from "@/lib/stores/useCurrentUserStore";
import { TriangleAlert } from "lucide-react";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";

const SetupCompanyInformationAlert = () => {
  const router = useRouter();
  const hasToSetupCompanyInformation = useCurrentUserStore(
    (state) =>
      state.user?.role === "employer" &&
      state.user?.hasToSetupCompanyInformation,
  );

  if (!hasToSetupCompanyInformation) return null;

  const handleGoToSetup = () => {
    router.push(EMPLOYER_ROUTES.COMPANY_PROFILE);
  };

  return (
    <Alert variant="default" className="fixed bottom-5 right-5 w-max">
      <TriangleAlert className="w-4 h-4" />
      <AlertTitle>Heads Up</AlertTitle>
      <AlertDescription>
        In order to use our platform as an employer, you need to set up your
        company information.
        <p>
          {" "}
          If you accidentally registered as an employer go to{" "}
          <Link href={SHARED_ROUTES.ACCOUNT_SETTINGS} className="underline">
            account settings
          </Link>{" "}
          to change your role.
        </p>
      </AlertDescription>
      <div className="mt-4">
        <Button variant="secondary" onClick={handleGoToSetup}>
          Go to setup
        </Button>
      </div>
    </Alert>
  );
};
export default SetupCompanyInformationAlert;
