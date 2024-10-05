import PageTitle from "@/components/common/PageTitle";
import { api } from "@/trpc/server";

const CompanyProfileDetails = async () => {
  const company = await api.company.getCompanyUserDetailsByUserId();
  if (!company) return null;

  return (
    <div>
      <PageTitle>Company Profile Details</PageTitle>
    </div>
  );
};

export default CompanyProfileDetails;
