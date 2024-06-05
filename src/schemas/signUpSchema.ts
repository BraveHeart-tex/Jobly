import { z } from "zod";

export const signUpSchema = z.object({
  firstName: z.coerce.string().min(1),
  lastName: z.coerce.string().min(1),
  email: z.coerce.string().email(),
  password: z.coerce.string().min(8, "Password must be at least 8 characters"),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
