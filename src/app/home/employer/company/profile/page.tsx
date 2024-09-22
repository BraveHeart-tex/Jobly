import PageContainer from "@/components/common/PageContainer";
import PageTitle from "@/components/common/PageTitle";
import { authActions } from "@/features/auth/actions/authActions";
import CompanyProfileDetails from "@/features/employer/company/components/CompanyProfileDetails";
import CompanyProfileSetup from "@/features/employer/company/components/CompanyProfileSetup";
import { SHARED_ROUTES } from "@/lib/routes";
import { redirect } from "next/navigation";

interface CompanyProfilePageSearchParams {
  hasToSetupCompanyInformation?: boolean;
}

interface CompanyProfilePageProps {
  searchParams: CompanyProfilePageSearchParams;
}

const CompanyProfilePage = async ({
  searchParams,
}: CompanyProfilePageProps) => {
  const { hasToSetupCompanyInformation } = searchParams;
  const currentUser = await authActions.getCurrentUser();

  if (!currentUser) {
    redirect(SHARED_ROUTES.LOGIN);
  }

  const renderContent = () => {
    if (currentUser?.hasToSetupCompanyInformation) {
      return (
        <>
          <div className="grid mb-4">
            <PageTitle>Set Up Your Company Profile</PageTitle>
            <p className="text-muted-foreground">
              In order to use our platform, you need to set up your company
              profile.
            </p>
          </div>
          <CompanyProfileSetup />
        </>
      );
    }

    if (
      !currentUser?.hasToSetupCompanyInformation &&
      !hasToSetupCompanyInformation
    ) {
      return <CompanyProfileDetails />;
    }
  };

  return (
    <div className="pt-10">
      <PageContainer>{renderContent()}</PageContainer>
    </div>
  );
};

export default CompanyProfilePage;
