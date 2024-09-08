import { api } from "@/trpc/server";
import CompanyProfileDetailsForm from "./CompanyProfileDetailsForm";

const CompanyProfileDetails = async () => {
  const company = await api.company.getCompanyDetailsByEmployerId();
  if (!company) return null;

  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight">
        Company Profile Details
      </h1>
      <CompanyProfileDetailsForm company={company} />
    </div>
  );
};

export default CompanyProfileDetails;
