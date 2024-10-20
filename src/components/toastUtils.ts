import { toast } from "sonner";

export const showSuccessToast = (message: string) => {
  return toast.success(message);
};

export const showErrorToast = (message: string) => {
  return toast.error(message);
};

export const showInfoToast = (message: string) => {
  return toast.info(message);
};
