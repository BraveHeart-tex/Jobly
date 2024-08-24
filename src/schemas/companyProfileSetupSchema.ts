import { z } from "zod";

export const companyProfileSetupSchema = z.object({
  name: z.coerce.string().min(1),
  bio: z.coerce.string().min(1),
  website: z.string().optional(),
  industry: z.coerce.string().min(1),
  address: z.string().optional(),
  foundedYear: z.coerce.string().min(1),
  employeeCount: z.coerce.string().min(1),
  logo: z.string().optional(),
  coverImage: z.string().optional(),
  description: z.string().optional(),
});

export type CompanyProfileSetupSchema = z.infer<
  typeof companyProfileSetupSchema
>;
