import { api } from "@/trpc/react";

export const useGetEducationalBackground = () => {
  const utils = api.useUtils();

  const fetchEducationalBackground = async (id: number) => {
    return utils.educationalBackgrounds.getEducationalBackground.fetch({ id });
  };

  return {
    fetchEducationalBackground,
  };
};
