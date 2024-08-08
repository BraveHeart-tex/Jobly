import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import { api } from "@/trpc/react";

export const useDeleteSection = () => {
	const { mutate: deleteSection, isPending } =
		api.document.deleteSection.useMutation({
			onMutate: ({ sectionId }) => {
				removeSectionFromState(sectionId);
			},
		});
	const removeSectionFromState = useDocumentBuilderStore(
		(state) => state.removeSection,
	);

	return {
		deleteSection,
		isDeleting: isPending,
	};
};
