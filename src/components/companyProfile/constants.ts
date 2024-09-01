import type { ButtonVariant } from "@/components/ui/button";
import type { CompanyProfileSetupFormKey } from "./types";

export const COMPANY_PROFILE_SETUP_STEPS = [
  {
    label: "Basic Information",
  },
  {
    label: "Company Details",
  },
  {
    label: "Company Description",
  },
  {
    label: "Summary",
  },
];

export const CONTROL_BUTTON_VARIANT: ButtonVariant = "secondary";
export const BASIC_INFORMATION_STEP = 1 as const;
export const COMPANY_DETAILS_STEP = 2 as const;
export const COMPANY_DESCRIPTION_STEP = 3 as const;
export const SUMMARY_STEP = 4 as const;

export const FIELD_TO_STEP_MAP: Record<CompanyProfileSetupFormKey, number> = {
  name: BASIC_INFORMATION_STEP,
  industry: BASIC_INFORMATION_STEP,
  website: BASIC_INFORMATION_STEP,

  yearOfEstablishment: COMPANY_DETAILS_STEP,
  address: COMPANY_DETAILS_STEP,
  companySize: COMPANY_DETAILS_STEP,
  areasOfExpertise: COMPANY_DETAILS_STEP,

  bio: COMPANY_DESCRIPTION_STEP,
  description: COMPANY_DESCRIPTION_STEP,
};

export const STEP_TO_FIELDS_MAP = Object.entries(FIELD_TO_STEP_MAP).reduce<
  Record<number, string[]>
>((acc, [field, step]) => {
  if (!acc[step]) {
    acc[step] = [];
  }

  // biome-ignore lint/style/noNonNullAssertion: It cannot be undefined at this point
  acc[step]!.push(field);

  return acc;
}, {});
