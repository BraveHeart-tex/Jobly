import { z } from "zod";

export const signUpSchema = z.object({
  firstName: z.string().min(1).default(""),
  lastName: z.string().min(1).default(""),
  email: z.string().email("Please enter a valid email address").default(""),
  password: z.string().min(8).default(""),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
