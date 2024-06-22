"use server";

import { db } from "@/server/db";
import type { User } from "@/server/db/schema";

export const getUserDocuments = async (userId: User["id"]) => {
  const [resumes, coverLetters] = await Promise.all([
    db.query.resume.findMany({
      where: (resume, { eq }) => eq(resume.userId, userId),
    }),
    db.query.coverLetter.findMany({
      where: (coverLetter, { eq }) => eq(coverLetter.userId, userId),
    }),
  ]);

  return { resumes, coverLetters };
};
