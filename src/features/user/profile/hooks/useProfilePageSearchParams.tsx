import { parseAsStringLiteral, useQueryState } from "nuqs";
import {
  modalDialogMap,
  type ModalDialogMapKey,
} from "../components/ProfileFormDialogContainer";

const MODAL_QUERY_KEY = "modal" as const;

export const useProfilePageSearchParams = () => {
  const [modalQuery, setModalQuery] = useQueryState(MODAL_QUERY_KEY, {
    shallow: true,
    ...parseAsStringLiteral<ModalDialogMapKey>(
      Object.keys(modalDialogMap) as ModalDialogMapKey[],
    ),
  });

  const openModal = (modalLink: ModalDialogMapKey) => {
    setModalQuery(modalLink);
  };

  const closeModal = async () => {
    await setModalQuery(null);
  };

  return {
    modalQuery,
    setModalQuery,
    openModal,
    closeModal,
  };
};
