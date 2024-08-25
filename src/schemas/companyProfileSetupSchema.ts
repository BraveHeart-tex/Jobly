import { z } from "zod";

export const companyProfileSetupSchema = z.object({
  name: z.string().min(1).default(""),
  bio: z.string().min(1).default(""),
  website: z.string().default(""),
  industry: z.string().min(1).default(""),
  address: z.string().default(""),
  yearOfEstablishment: z.string().min(1).default(""),
  companySize: z.string().min(1).default(""),
  areasOfExpertise: z.string().default(""),
  logo: z.string().default(""),
  coverImage: z.string().default(""),
  description: z.string().default(""),
});

export type CompanyProfileSetupSchema = z.infer<
  typeof companyProfileSetupSchema
>;
