import { z } from "zod";

export const companyProfileSetupSchema = z.object({
  name: z.string().min(1),
  bio: z.string().min(1),
  website: z.string().optional(),
  industry: z.string().min(1),
  address: z.string().optional(),
  foundedYear: z.string().min(1),
  employeeCount: z.string().min(1),
  logo: z.string().optional(),
  coverImage: z.string().optional(),
  description: z.string().optional(),
});

export type CompanyProfileSetupSchema = z.infer<
  typeof companyProfileSetupSchema
>;
