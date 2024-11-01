"use client";
import { Button } from "@/components/ui/button";

const DeleteAccountButton = () => {
  const handleDeleteAccount = () => {};
  return (
    <Button variant="destructive" onClick={handleDeleteAccount}>
      Delete Account & Data
    </Button>
  );
};

export default DeleteAccountButton;
