import { api } from "@/trpc/react";

export const useDocuments = () => {
  const { data, isPending, isError } = api.document.getUserDocuments.useQuery();

  return {
    resumes: data?.resumes ?? [],
    coverLetters: data?.coverLetters ?? [],
    isPending,
    isError,
  };
};
