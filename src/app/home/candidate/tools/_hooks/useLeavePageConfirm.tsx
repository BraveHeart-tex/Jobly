import { useEffect } from "react";

export const useLeavePageConfirm = (isActive: boolean) => {
	useEffect(() => {
		const beforeUnloadListener = (event: BeforeUnloadEvent) => {
			event.preventDefault();
		};

		if (isActive) {
			addEventListener("beforeunload", beforeUnloadListener);
		} else {
			removeEventListener("beforeunload", beforeUnloadListener);
		}

		return () => {
			removeEventListener("beforeunload", beforeUnloadListener);
		};
	}, [isActive]);
};
