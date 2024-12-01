import { type ExternalToast, toast } from "sonner";

export const showSuccessToast = (message: string, data?: ExternalToast) => {
  return toast.success(message, data);
};

export const showErrorToast = (message: string, data?: ExternalToast) => {
  return toast.error(message, data);
};

export const showInfoToast = (message: string, data?: ExternalToast) => {
  return toast.info(message, data);
};

export const showLoadingToast = (message: string, data?: ExternalToast) => {
  return toast.loading(message, data);
};
