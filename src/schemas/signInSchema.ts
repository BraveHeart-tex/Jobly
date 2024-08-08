import { z } from "zod";

export const signInSchema = z.object({
	email: z.string().email("Please enter a valid email address").default(""),
	password: z.string().min(8).max(256).default(""),
});

export type SignInSchema = z.infer<typeof signInSchema>;
