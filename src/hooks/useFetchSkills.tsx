import { getSkillsByName } from "@/features/employer/jobPosting/actions/skillActions";
import type { SkillSelectModel } from "@/server/db/schema/skills";
import { useState, useTransition } from "react";
import debounce from "lodash.debounce";

const FETCH_SKILLS_DEBOUNCE_MS = 500;

export const useFetchSkills = () => {
  const [isFetchingSkills, startTransition] = useTransition();
  const [skills, setSkills] = useState<SkillSelectModel[]>([]);

  const debouncedFetchSkills = debounce(async (query: string) => {
    const dbSkills = await getSkillsByName(query);
    setSkills(dbSkills);
  }, FETCH_SKILLS_DEBOUNCE_MS);

  const fetchSkills = (query: string) => {
    startTransition(async () => {
      await debouncedFetchSkills(query);
    });
  };

  return { fetchSkills, skills, isFetchingSkills };
};
