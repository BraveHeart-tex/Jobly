"use client";
import { showSuccessToast } from "@/components/toastUtils";
import { Button } from "@/components/ui/button";
import { useInvalidateAllOtherSessions } from "@/features/auth/hooks/useInvalidateAllOtherSessions";
import { useConfirmStore } from "@/lib/stores/useConfirmStore";

const SignOutAllOtherSessionsButton = () => {
  const showConfirmDialog = useConfirmStore((state) => state.showConfirmDialog);
  const { invalidateAllOtherUserSessions, isPending } =
    useInvalidateAllOtherSessions({
      onSuccess: () => {
        showSuccessToast("All other sessions signed out successfully.");
      },
    });

  const handleSignOutAllOtherSessions = async () => {
    showConfirmDialog({
      title: "Are you sure you want to sign out all other sessions?",
      message: "This action cannot be undone.",
      primaryActionLabel: "Yes",
      onConfirm() {
        invalidateAllOtherUserSessions();
      },
    });
  };

  return (
    <Button
      variant="destructive"
      onClick={handleSignOutAllOtherSessions}
      disabled={isPending}
    >
      {isPending ? "Signing out..." : "Sign Out All Other Sessions"}
    </Button>
  );
};
export default SignOutAllOtherSessionsButton;
