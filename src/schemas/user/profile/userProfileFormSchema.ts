import { personalDetails } from "@/server/db/schema";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import educationSchema from "./educationSchema";
import skillSchema from "./skillSchema";
import workExperienceSchema from "./workExperienceSchema";

const personalDetailsSchema = createInsertSchema(personalDetails);

const userProfileFormSchema = z
  .object({
    firstName: z.string().min(1).default(""),
    lastName: z.string().min(1).default(""),
    workExperiences: z.array(workExperienceSchema),
    educationalBackground: z.array(educationSchema),
    skills: z.array(
      skillSchema.extend({
        level: z.string().max(50).nullable().optional().default(""),
      }),
    ),
  })
  .merge(personalDetailsSchema);

export type UserProfileFormSchema = z.infer<typeof userProfileFormSchema>;

export default userProfileFormSchema;
