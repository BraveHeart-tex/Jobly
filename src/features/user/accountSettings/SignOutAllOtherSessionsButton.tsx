"use client";
import { Button } from "@/components/ui/button";
import { useInvalidateAllOtherSessions } from "@/features/auth/hooks/useInvalidateAllOtherSessions";
import { useConfirmStore } from "@/lib/stores/useConfirmStore";

interface SignOutAllOtherSessionsButtonProps {
  disabled?: boolean;
}

const SignOutAllOtherSessionsButton = ({
  disabled,
}: SignOutAllOtherSessionsButtonProps) => {
  const showConfirmDialog = useConfirmStore((state) => state.showConfirmDialog);
  const { invalidateAllOtherUserSessions, isPending } =
    useInvalidateAllOtherSessions();

  const handleSignOutAllOtherSessions = async () => {
    showConfirmDialog({
      title: "Are you sure you want to sign out all other sessions?",
      message: "You will be signed out.",
      primaryActionLabel: "Sign Out",
      onConfirm() {
        invalidateAllOtherUserSessions();
      },
    });
  };

  return (
    <Button
      variant="outline"
      onClick={handleSignOutAllOtherSessions}
      disabled={disabled || isPending}
    >
      {isPending ? "Signing out..." : "Sign Out All Other Sessions"}
    </Button>
  );
};
export default SignOutAllOtherSessionsButton;
