import { api } from "@/trpc/react";

export const useGetEducationalBackgrounds = () => {
  const {
    data: educationalBackgrounds,
    isPending: isFetchingEducationalBackgrounds,
  } = api.educationalBackgrounds.getEducationalBackgrounds.useQuery();

  return { educationalBackgrounds, isFetchingEducationalBackgrounds };
};
