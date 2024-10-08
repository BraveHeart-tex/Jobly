import { parseAsStringLiteral, useQueryState } from "nuqs";
import {
  modalDialogMap,
  type ModalDialogMapKey,
} from "../components/ProfileFormDialogContainer";

const MODAL_QUERY_KEY = "modal" as const;

export const useProfilePageSearchParams = () => {
  const [modalQuery, setModalQuery] = useQueryState(
    MODAL_QUERY_KEY,
    parseAsStringLiteral<ModalDialogMapKey>(
      Object.keys(modalDialogMap) as ModalDialogMapKey[],
    ),
  );

  const openModal = (modalLink: ModalDialogMapKey) => {
    setModalQuery(modalLink);
  };

  const closeModal = () => {
    setModalQuery(null);
  };

  return {
    modalQuery,
    setModalQuery,
    openModal,
    closeModal,
  };
};

export const getAboutQueryKey = () => "about";
export const getCreateWorkExperienceKey = () => "workExperience&intent=new";
