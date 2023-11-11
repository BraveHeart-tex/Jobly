import { z } from "zod";

const RegisterUserSchema = z.object({
  name: z.coerce.string().min(3, "Name should at least be 2 characters long.").default(""),
  email: z.string().email("Invalid email address.").default(""),
  password: z
    .string()
    .min(8, "Password should at least be 8 characters long.")
    .default("")
    .superRefine((data, ctx) => {
      // 8 characters long
      // one uppercase
      // one lowercase
      // and one number
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      if (!data.match(regex)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password should contain at least 1 uppercase, 1 lowercase and 1 number.",
          path: [],
        });
      }
    }),
});

export type RegisterUserSchemaType = z.infer<typeof RegisterUserSchema>;
export default RegisterUserSchema;
