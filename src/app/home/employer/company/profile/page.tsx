import PageContainer from "@/components/PageContainer";
import CompanyProfileSetup from "@/components/companyProfile/CompanyProfileSetup";

interface CompanyProfilePageSearchParams {
  hasToSetupCompanyInformation?: boolean;
}

interface CompanyProfilePageProps {
  searchParams: CompanyProfilePageSearchParams;
}

const CompanyProfilePage = ({ searchParams }: CompanyProfilePageProps) => {
  const { hasToSetupCompanyInformation } = searchParams;

  const renderContent = () => {
    if (hasToSetupCompanyInformation) {
      return <CompanyProfileSetup />;
    }

    return (
      <>
        <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight">
          Company Profile
        </h1>
      </>
    );
  };

  return (
    <div>
      <PageContainer>{renderContent()}</PageContainer>
    </div>
  );
};

export default CompanyProfilePage;
