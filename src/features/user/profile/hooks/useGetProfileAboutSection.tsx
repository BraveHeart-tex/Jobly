import type { SkillSelectModel } from "@/server/db/schema/skills";
import { api } from "@/trpc/react";
import { useEffect, useState } from "react";

export const useGetProfileAboutSection = () => {
  const [bio, setBio] = useState<{
    id: number | null;
    content: string;
  }>({
    id: null,
    content: "",
  });
  const [highlightedSkills, setHighlightedSkills] = useState<
    SkillSelectModel[]
  >([]);

  const { data: aboutSectionData, isPending: isPendingAboutData } =
    api.userProfile.getAboutInformation.useQuery();

  useEffect(() => {
    if (!aboutSectionData) return;

    setBio(aboutSectionData?.bio);
    setHighlightedSkills(
      aboutSectionData?.highlightedSkills.map((item) => ({
        id: item.skillId,
        name: item.name,
      })),
    );
  }, [aboutSectionData]);

  return {
    bio,
    highlightedSkills,
    setBio,
    setHighlightedSkills,
    isPendingAboutData,
  };
};
