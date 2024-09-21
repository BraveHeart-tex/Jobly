import PageTitle from "@/components/common/PageTitle";
import { api } from "@/trpc/server";
import CompanyProfileDetailsForm from "./CompanyProfileDetailsForm";

const CompanyProfileDetails = async () => {
  const company = await api.company.getUserCompanyDetailsByUserId();
  if (!company) return null;

  return (
    <div>
      <PageTitle>Company Profile Details</PageTitle>
      <CompanyProfileDetailsForm company={company} />
    </div>
  );
};

export default CompanyProfileDetails;
