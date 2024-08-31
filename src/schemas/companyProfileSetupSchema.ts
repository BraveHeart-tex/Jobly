import { z } from "zod";

const currentYear = new Date().getFullYear();

const yearOfEstablishmentSchema = z
  .string()
  .min(1, "Year is required")
  .max(4, "Year should not exceed 4 digits")
  .refine((val) => /^\d+$/.test(val), {
    message: "Year must contain only digits",
  })
  .refine(
    (val) => {
      const year = Number.parseInt(val, 10);
      return year >= 1800 && year <= currentYear;
    },
    {
      message: `Year must be between 1800 and ${currentYear}`,
    },
  );

export const companyProfileSetupSchema = z.object({
  name: z.string().min(1).default(""),
  bio: z.string().min(1).default(""),
  website: z.string().default(""),
  industry: z.string().min(1).default(""),
  address: z.string().default(""),
  yearOfEstablishment: yearOfEstablishmentSchema,
  companySize: z.string().min(1, "Company size is required").default(""),
  areasOfExpertise: z.string().default(""),
  logo: z.string().default(""),
  coverImage: z.string().default(""),
  description: z.string().default(""),
});

export type CompanyProfileSetupSchema = z.infer<
  typeof companyProfileSetupSchema
>;
