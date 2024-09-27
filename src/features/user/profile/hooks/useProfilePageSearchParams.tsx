import { useQueryState } from "nuqs";

const MODAL_QUERY_KEY = "modal" as const;

export const useProfilePageSearchParams = () => {
  const [modalQuery, setModalQuery] = useQueryState(MODAL_QUERY_KEY);

  const openModal = (modalLink: string) => {
    setModalQuery(modalLink);
  };

  const closeModal = () => {
    setModalQuery("");
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
