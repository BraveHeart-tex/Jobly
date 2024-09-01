import PageContainer from "@/components/PageContainer";
import CompanyProfileDetails from "@/components/companyProfile/CompanyProfileDetails";
import CompanyProfileSetup from "@/components/companyProfile/CompanyProfileSetup";
import { getCurrentUser } from "@/lib/auth/actions";

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
  const currentUser = await getCurrentUser();

  const renderContent = () => {
    if (currentUser?.hasToSetupCompanyInformation) {
      return (
        <>
          <div className="grid mb-4">
            <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight">
              Set Up Your Company Profile
            </h1>
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
    <div>
      <PageContainer>{renderContent()}</PageContainer>
    </div>
  );
};

export default CompanyProfilePage;
