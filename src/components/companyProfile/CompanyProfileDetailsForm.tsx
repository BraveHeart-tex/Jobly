"use client";
import { useExtendedForm } from "@/lib/hook-form/useExtendedForm";
import {
  type CompanyProfileSetupSchema,
  companyProfileSetupSchema,
} from "@/schemas/companyProfileSetupSchema";
import type { CompanySelectModel } from "@/server/db/schema/companies";

interface CompanyProfileDetailsFormProps {
  company: CompanySelectModel;
}

const CompanyProfileDetailsForm = ({
  company,
}: CompanyProfileDetailsFormProps) => {
  const mappedDefaultValues = Object.keys(company).reduce((acc, curr) => {
    const key = curr as keyof CompanyProfileSetupSchema;
    const value = company[key] || "";
    acc[key] = value;
    return acc;
  }, {} as CompanyProfileSetupSchema);

  const _form = useExtendedForm<CompanyProfileSetupSchema>(
    companyProfileSetupSchema,
    {
      defaultValues: mappedDefaultValues,
    },
  );

  return <div>form</div>;
};

export default CompanyProfileDetailsForm;
