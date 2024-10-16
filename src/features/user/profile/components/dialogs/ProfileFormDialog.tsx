import FormDialog from "@/components/common/FormDialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useExtendedForm } from "@/lib/hook-form/useExtendedForm";
import {
  ProfileValidator,
  type ProfileData,
} from "@/validators/user/profile/profileValidator";
import { useProfilePageSearchParams } from "../../hooks/useProfilePageSearchParams";
import { Input } from "@/components/ui/input";
import RequiredIndicator from "@/components/common/RequiredIndicator";
import { useEffect, useState, useTransition } from "react";
import { useGetUserProfile } from "../../hooks/useGetUserProfile";
import Combobox, { type ComboboxOption } from "@/components/common/Combobox";
import AutoComplete from "@/components/common/AutoComplete";
import { INDUSTRIES_DATASET } from "@/lib/datasets";

const ProfileFormDialog = () => {
  const { closeModal } = useProfilePageSearchParams();
  const form = useExtendedForm<ProfileData>(ProfileValidator, {
    defaultValues: {
      firstName: "",
      lastName: "",
      websiteLink: "",
      websiteLinkText: "",
      sector: "",
      title: "",
    },
  });

  const { getUserProfile } = useGetUserProfile();
  const [isPending, startTransition] = useTransition();
  const [schoolDataset, setSchoolDataset] = useState<ComboboxOption[]>([]);
  const [workExperienceDataset, setWorkExperienceDataset] = useState<
    ComboboxOption[]
  >([]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    startTransition(async () => {
      const profileDetails = await getUserProfile();

      if (!profileDetails) return;

      if (profileDetails.workExperiences.length > 0) {
        const mappedExperienceOptions = profileDetails.workExperiences.map(
          (experience) => ({
            value: experience.id.toString(),
            label: `${experience.jobTitle} - ${experience.employer}`,
          }),
        );
        setWorkExperienceDataset(mappedExperienceOptions);
      }

      // TODO: handle school dataset and other form values as well
      const {
        firstName,
        lastName,
        websiteLink,
        websiteLinkText,
        sector,
        title,
        cityId,
        countryId,
        presentedSchoolId,
        presentedWorkExperienceId,
      } = profileDetails;

      form.reset({
        firstName,
        lastName,
        websiteLink,
        websiteLinkText,
        sector: sector || "",
        title: title || "",
        cityId: cityId || undefined,
        countryId: countryId || undefined,
        presentedSchoolId: presentedSchoolId || undefined,
        presentedWorkExperienceId:
          presentedWorkExperienceId ||
          profileDetails.workExperiences[0]?.id ||
          undefined,
      });
    });
  }, []);

  const onSubmit = async (data: ProfileData) => {
    console.info(data);
  };

  const defaultSpaceYClassName = "space-y-4";
  const subSectionHeadingClassNames = "scroll-m-20 text-xl font-semibold";

  return (
    <FormDialog
      title="Edit Personal Details"
      onClose={closeModal}
      onSubmit={onSubmit}
      isSaveDisabled={isPending}
      isLoadingInitialData={isPending}
      form={form}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={defaultSpaceYClassName}
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  First name <RequiredIndicator />
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Last name <RequiredIndicator />
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <h3 className={subSectionHeadingClassNames}>Current Position</h3>

            <div className={defaultSpaceYClassName}>
              <FormField
                control={form.control}
                name="presentedWorkExperienceId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position</FormLabel>
                    <FormControl>
                      <Combobox
                        options={workExperienceDataset}
                        value={field.value}
                        onChange={(value) => field.onChange(+value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sector"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sector</FormLabel>
                    <FormControl>
                      <AutoComplete
                        options={INDUSTRIES_DATASET.map((item) => ({
                          label: item,
                          value: item,
                        }))}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div>
            <h3 className={subSectionHeadingClassNames}>Education</h3>
            <FormField
              control={form.control}
              name="presentedSchoolId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    School <RequiredIndicator />
                  </FormLabel>
                  <FormControl>
                    <Combobox
                      options={schoolDataset}
                      value={
                        field?.value?.toString() ||
                        schoolDataset[0]?.value ||
                        ""
                      }
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <h3 className={subSectionHeadingClassNames}>Location</h3>
            <div className={defaultSpaceYClassName}>
              <FormField
                control={form.control}
                name="countryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Country <RequiredIndicator />
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cityId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div>
            <h3 className={subSectionHeadingClassNames}>Website</h3>
            <div className={defaultSpaceYClassName}>
              <FormField
                control={form.control}
                name="websiteLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website link</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="websiteLinkText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website link text</FormLabel>
                    <FormControl>
                      <div>
                        <Input {...field} value={field.value || ""} />
                        <div className="flex items-center justify-between">
                          <FormDescription>
                            Edit how your link is displayed (optional).
                          </FormDescription>
                          <span className="text-muted-foreground text-[0.8rem]">
                            {form.watch("websiteLinkText")?.length || 0}/30
                          </span>
                        </div>
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </FormDialog>
  );
};

export default ProfileFormDialog;
