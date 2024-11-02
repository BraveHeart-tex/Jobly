import SelectInput from "@/components/common/SelectInput";
import { showSuccessToast } from "@/components/toastUtils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signOut } from "@/features/auth/utils";
import { useUpdatePersonalSettings } from "@/features/user/accountSettings/hooks/useUpdatePersonalSettings";
import { useExtendedForm } from "@/lib/hook-form/useExtendedForm";
import { useConfirmStore } from "@/lib/stores/useConfirmStore";
import { useCurrentUserStore } from "@/lib/stores/useCurrentUserStore";
import {
  type PersonalSettingsFormData,
  personalSettingsFormValidator,
} from "@/validators/user/settings/personalSettingsFormValidator";
import { useEffect } from "react";

const PersonalSettingsForm = () => {
  const user = useCurrentUserStore((state) => state.user);
  const setUser = useCurrentUserStore((state) => state.setUser);
  const updateStorePersonalSettings = useCurrentUserStore(
    (state) => state.updatePersonalSettings,
  );
  const form = useExtendedForm<PersonalSettingsFormData>(
    personalSettingsFormValidator,
  );
  const showConfirmDialog = useConfirmStore((state) => state.showConfirmDialog);

  useEffect(() => {
    if (!user) return;
    form.reset({
      accountType: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  }, [user, form.reset]);

  const { updatePersonalSettings, isUpdatingPersonalSettings } =
    useUpdatePersonalSettings({
      onSuccess: (_data, variables) => {
        const hasChangedRoles = variables.accountType !== user?.role;
        showSuccessToast(
          `Personal settings updated successfully. ${hasChangedRoles ? "You are being logged out." : ""}`,
        );

        if (hasChangedRoles) {
          signOut(variables.accountType);
          setUser(null);
          return;
        }

        updateStorePersonalSettings(variables);
      },
    });

  const onSubmit = (data: PersonalSettingsFormData) => {
    const hasChangedRoles = data.accountType !== user?.role;
    if (hasChangedRoles) {
      return showConfirmDialog({
        title: "Are you sure you want to change your account type?",
        message:
          "This action cannot be undone. There might be data loss. You will be logged out of all your current sessions.",
        onConfirm: () => updatePersonalSettings(data),
        primaryActionLabel: "Yes",
      });
    }

    updatePersonalSettings(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="min-h-[5rem]">
                <FormLabel>First name</FormLabel>
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
              <FormItem className="min-h-[5rem]">
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="accountType"
          render={({ field }) => (
            <FormItem className="min-h-[5rem]">
              <FormLabel>Account Type</FormLabel>
              <FormControl>
                <SelectInput
                  options={[
                    { label: "Employer", value: "employer" },
                    { label: "Candidate", value: "candidate" },
                  ]}
                  value={field.value}
                  onChange={field.onChange}
                  ref={field.ref}
                  placeholder="Select account type"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full sm:w-max mt-2"
          disabled={
            form.formState.isSubmitting ||
            !form.formState.isDirty ||
            isUpdatingPersonalSettings
          }
        >
          {!isUpdatingPersonalSettings ? "Save Changes" : "Saving Changes..."}
        </Button>
      </form>
    </Form>
  );
};

export default PersonalSettingsForm;
