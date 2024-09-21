import { z } from "zod";
import educationSchema from "./educationSchema";
import skillSchema from "./skillSchema";
import workExperienceSchema from "./workExperienceSchema";

const userProfileFormSchema = z.object({
  // personal details
  firstName: z.string().min(1).default(""),
  lastName: z.string().min(1).default(""),
  email: z
    .union([
      z.string().email("Please enter a valid email address"),
      z.literal(""),
    ])
    .default(""),
  phoneNumber: z.string().default(""),
  country: z.string().default(""),
  city: z.string().default(""),
  address: z.string().default(""),
  postalCode: z.string().default(""),
  drivingLicense: z.string().default(""),
  placeOfBirth: z.string().default(""),
  dateOfBirth: z.string().default(""),
  professionalSummary: z.string().default(""),

  workExperiences: z.array(workExperienceSchema),
  educationalBackground: z.array(educationSchema),
  skills: z.array(skillSchema),
});

export type UserProfileFormSchema = z.infer<typeof userProfileFormSchema>;

export default userProfileFormSchema;
