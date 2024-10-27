import FormDialog from "@/components/common/FormDialog";
import { useProfilePageSearchParams } from "@/features/user/profile/hooks/useProfilePageSearchParams";
import { useExtendedForm } from "@/lib/hook-form/useExtendedForm";
import {
  type UserSkillsData,
  userSkillsValidator,
} from "@/validators/user/profile/userSkillsValidator";

const SkillsDialog = () => {
  const form = useExtendedForm<UserSkillsData>(userSkillsValidator);

  const { idQuery, closeModal } = useProfilePageSearchParams();
  const isEditMode = !!idQuery;

  // TODO:
  const onSubmit = (_data: UserSkillsData) => {};

  // TODO:
  const isFetchingSkillDetails = false;
  const isUpdatingSkill = false;

  const handleDelete = () => {};

  return (
    <FormDialog
      title="Add A Skill"
      onClose={closeModal}
      isSaveDisabled={isFetchingSkillDetails || isUpdatingSkill}
      isCloseDisabled={isUpdatingSkill}
      isLoadingInitialData={isFetchingSkillDetails}
      form={form}
      onSubmit={onSubmit}
      onDeleteClick={isEditMode ? handleDelete : undefined}
    >
      <div>SkillsDialog</div>
    </FormDialog>
  );
};

export default SkillsDialog;
