import { z } from "zod";

const userProfileFormSchema = z.object({});

export type UserProfileFormSchema = z.infer<typeof userProfileFormSchema>;

export default userProfileFormSchema;
