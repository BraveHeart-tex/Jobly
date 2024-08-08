import { api } from "@/trpc/react";

export const useDocuments = () => {
	const { data, isPending, isError } =
		api.document.getUserDocuments.useQuery();
	const resumes = data?.filter((item) => item.type === "resume") || [];
	const coverLetters =
		data?.filter((item) => item.type === "cover_letter") || [];

	return {
		resumes,
		coverLetters,
		isPending,
		isError,
	};
};
