"use client";
import { showSuccessToast } from "@/components/toastUtils";
import { Button } from "@/components/ui/button";
import { useDeleteAccount } from "@/features/auth/hooks/useDeleteAccount";
import { signOut } from "@/features/auth/utils";
import { useConfirmStore } from "@/lib/stores/useConfirmStore";

const DeleteAccountButton = () => {
  const showConfirmDialog = useConfirmStore((state) => state.showConfirmDialog);
  const { deleteAccount, isDeletingAccount } = useDeleteAccount({
    onSuccess: async () => {
      showSuccessToast("Account deleted successfully.");
      await signOut("candidate");
    },
  });

  const handleDeleteAccount = () => {
    showConfirmDialog({
      title: "Are you sure you want to delete your account?",
      message: "This action cannot be undone. There will be data loss.",
      onConfirm: () => {
        deleteAccount();
      },
      primaryActionLabel: "Yes",
    });
  };

  return (
    <Button
      variant="destructive"
      onClick={handleDeleteAccount}
      disabled={isDeletingAccount}
    >
      {isDeletingAccount ? "Deleting..." : "Delete Account & Data"}
    </Button>
  );
};

export default DeleteAccountButton;
