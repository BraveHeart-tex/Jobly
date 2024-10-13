import { parseAsStringLiteral, useQueryState } from "nuqs";
import {
  modalDialogMap,
  type ModalDialogMapKey,
} from "../components/ProfileFormDialogContainer";

const MODAL_QUERY_KEY = "modal" as const;
const ENTITY_ID_QUERY_KEY = "id" as const;

export const useProfilePageSearchParams = () => {
  const [modalQuery, setModalQuery] = useQueryState(
    MODAL_QUERY_KEY,
    parseAsStringLiteral<ModalDialogMapKey>(
      Object.keys(modalDialogMap) as ModalDialogMapKey[],
    ),
  );
  const [idQuery, setIdQuery] = useQueryState(ENTITY_ID_QUERY_KEY, {
    parse(value) {
      if (!value) return null;
      return Number(value);
    },
  });

  const openModal = (modalLink: ModalDialogMapKey, id?: number) => {
    setModalQuery(modalLink);
    if (id) setIdQuery(id);
  };

  const closeModal = async () => {
    await Promise.all([setModalQuery(null), setIdQuery(null)]);
  };

  return {
    modalQuery,
    setModalQuery,
    openModal,
    closeModal,
    idQuery,
  };
};
