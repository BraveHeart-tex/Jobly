"use client";
import { useTheme } from "next-themes";
import { Toaster } from "sonner";

const SonnerToaster = () => {
  const { theme } = useTheme();
  return <Toaster richColors theme={theme as "light" | "dark"} />;
};
export default SonnerToaster;
