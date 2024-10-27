import FormDialog from "@/components/common/FormDialog";
import RequiredIndicator from "@/components/common/RequiredIndicator";
import CreatableMultiSelect from "@/components/common/select/CreatableMultiSelect";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { useLoadSkillOptions } from "@/features/employer/jobPosting/hooks/useLoadSkillOptions";
import { useGetEducationalBackgrounds } from "@/features/user/profile/hooks/useGetEducationalBackgrounds";
import { useGetWorkExperiences } from "@/features/user/profile/hooks/useGetWorkExperiences";
import { useProfilePageSearchParams } from "@/features/user/profile/hooks/useProfilePageSearchParams";
import { useExtendedForm } from "@/lib/hook-form/useExtendedForm";
import {
  type UserSkillsData,
  userSkillsValidator,
} from "@/validators/user/profile/userSkillsValidator";

const UserSkillsFormDialog = () => {
  const form = useExtendedForm<UserSkillsData>(userSkillsValidator, {
    defaultValues: {
      selectedSkill: undefined,
      attributedWorkExperienceIds: [],
      attributedEducationIds: [],
    },
  });

  const { idQuery, closeModal } = useProfilePageSearchParams();

  const { workExperiences, isFetchingWorkExperiences } =
    useGetWorkExperiences();
  const { educationalBackgrounds, isFetchingEducationalBackgrounds } =
    useGetEducationalBackgrounds();

  const isEditMode = !!idQuery;
  const workExperienceCount = workExperiences?.length ?? 0;
  const educationalBackgroundCount = educationalBackgrounds?.length ?? 0;
  const shouldRenderAttributeTitle =
    workExperienceCount > 0 || educationalBackgroundCount > 0;
  const isFetchingSkillDetails = false;
  const isUpdatingSkill = false;

  const loadSkillOptions = useLoadSkillOptions();

  const onSubmit = (_data: UserSkillsData) => {};
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
            {form.watch("selectedSkill.id") && (
              <>
                {shouldRenderAttributeTitle && (
                  <div>
                    <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                      Show where you have used this skill
                    </h3>
                    <p className="text-muted-foreground text-[0.9rem]">
                      75% of recruiters value skill. Choose at least one place
                      where you used this skill.
                    </p>
                  </div>
                )}
                {workExperienceCount > 0 ? (
                  <FormField
                    control={form.control}
                    name="attributedWorkExperienceIds"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Work Experience</FormLabel>
                        <FormControl>
                          <div className="flex flex-col gap-3">
                            {workExperiences?.map((item) => (
                              <div
                                className="flex items-center gap-1"
                                key={item.id}
                              >
                                <Checkbox
                                  ref={field.ref}
                                  value={item.id}
                                  checked={field.value.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    const newItems = checked
                                      ? [...field.value, item.id]
                                      : field.value.filter(
                                          (id) => id !== item.id,
                                        );
                                    field.onChange(newItems);
                                  }}
                                  id={item.id.toString()}
                                />
                                <Label htmlFor={item.id.toString()}>
                                  {item.jobTitle} - {item.employer}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ) : null}
                {educationalBackgroundCount > 0 ? (
                  <FormField
                    control={form.control}
                    name="attributedEducationIds"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Education</FormLabel>
                        <FormControl>
                          <div className="flex flex-col gap-3">
                            {educationalBackgrounds?.map((item) => (
                              <div
                                className="flex items-center gap-1"
                                key={item.id}
                              >
                                <Checkbox
                                  ref={field.ref}
                                  value={item.id}
                                  checked={field.value.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    const newItems = checked
                                      ? [...field.value, item.id]
                                      : field.value.filter(
                                          (id) => id !== item.id,
                                        );
                                    field.onChange(newItems);
                                  }}
                                  id={item.id.toString()}
                                />
                                <Label htmlFor={item.id.toString()}>
                                  {item.fieldOfStudy} - {item.school}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ) : null}
              </>
            )}
          </div>
        </form>
      </Form>
    </FormDialog>
  );
};

export default UserSkillsFormDialog;
