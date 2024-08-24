import { z } from "zod";

export const companyProfileSetupSchema = z.object({
  name: z.string().min(1),
  bio: z.string().min(1),
  website: z.string(),
  industry: z.string().min(1),
  address: z.string(),
  yearOfEstablishment: z.string().min(1),
  companySize: z.string().min(1),
  areasOfExpertise: z.string(),
  logo: z.string(),
  coverImage: z.string(),
  description: z.string(),
});

export type CompanyProfileSetupSchema = z.infer<
  typeof companyProfileSetupSchema
>;
