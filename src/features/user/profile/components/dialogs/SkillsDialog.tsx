import FormDialog from "@/components/common/FormDialog";
import RequiredIndicator from "@/components/common/RequiredIndicator";
import CreatableMultiSelect from "@/components/common/select/CreatableMultiSelect";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useLoadSkillOptions } from "@/features/employer/jobPosting/hooks/useLoadSkillOptions";
import { useProfilePageSearchParams } from "@/features/user/profile/hooks/useProfilePageSearchParams";
import { useExtendedForm } from "@/lib/hook-form/useExtendedForm";
import {
  type UserSkillsData,
  userSkillsValidator,
} from "@/validators/user/profile/userSkillsValidator";

const SkillsDialog = () => {
  const form = useExtendedForm<UserSkillsData>(userSkillsValidator, {
    defaultValues: {
      selectedWorkExperience: null,
      selectedEducation: null,
      selectedSkill: undefined,
    },
  });

  const loadSkillOptions = useLoadSkillOptions();
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
      title={`${isEditMode ? "Edit" : "Add"} Skill`}
      onClose={closeModal}
      isSaveDisabled={isFetchingSkillDetails || isUpdatingSkill}
      isCloseDisabled={isUpdatingSkill}
      isLoadingInitialData={isFetchingSkillDetails}
      form={form}
      onSubmit={onSubmit}
      onDeleteClick={isEditMode ? handleDelete : undefined}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="selectedSkill"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Skill <RequiredIndicator />
                  </FormLabel>
                  <FormControl>
                    <CreatableMultiSelect
                      value={{
                        value: field?.value?.id?.toString(),
                        label: field?.value?.label,
                      }}
                      loadOptions={loadSkillOptions}
                      isMulti={false}
                      placeholder="Select a skill"
                      onCreateOption={() => {}}
                      ref={field.ref}
                      onChange={(option) => {
                        if (!option) {
                          field.onChange(null);
                          return;
                        }

                        field.onChange({
                          id: Number.parseInt(option.value as string),
                          label: option.label,
                        });
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* TODO: Add checkboxes for selecting work experience or education */}
          </div>
        </form>
      </Form>
    </FormDialog>
  );
};

export default SkillsDialog;
