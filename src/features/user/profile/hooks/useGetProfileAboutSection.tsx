import type { SkillSelectModel } from "@/server/db/schema/skills";
import { api } from "@/trpc/react";
import { useEffect, useMemo, useState } from "react";

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
        order: item.order,
      })),
    );
  }, [aboutSectionData]);

  const isDirty = useMemo(() => {
    if (!aboutSectionData) return false;

    const initialHighlightedSkillsIds = aboutSectionData?.highlightedSkills.map(
      (item) => item.skillId,
    );
    const currentHighlightedSkillsIds = highlightedSkills.map(
      (item) => item.id,
    );

    return (
      aboutSectionData.bio.content !== bio.content ||
      JSON.stringify(initialHighlightedSkillsIds) !==
        JSON.stringify(currentHighlightedSkillsIds)
    );
  }, [aboutSectionData, bio.content, highlightedSkills]);

  return {
    bio,
    highlightedSkills,
    setBio,
    setHighlightedSkills,
    isPendingAboutData,
    isDirty,
  };
};
