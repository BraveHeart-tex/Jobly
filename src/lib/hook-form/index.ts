import {
  type Control,
  type FieldValues,
  type FormState,
  useForm,
  type UseFormClearErrors,
  type UseFormGetFieldState,
  type UseFormGetValues,
  type UseFormHandleSubmit,
  type UseFormProps,
  type UseFormRegister,
  type UseFormReset,
  type UseFormResetField,
  type UseFormSetError,
  type UseFormSetFocus,
  type UseFormSetValue,
  type UseFormTrigger,
  type UseFormUnregister,
  type UseFormWatch,
} from "react-hook-form";

export const useExtendedForm = <TFieldValues extends FieldValues = FieldValues>(
  props?: UseFormProps,
): {
  getValues: UseFormGetValues<FieldValues>;
  resetField: UseFormResetField<FieldValues>;
  clearErrors: UseFormClearErrors<FieldValues>;
  unregister: UseFormUnregister<FieldValues>;
  setInitialValues: (values: Record<keyof TFieldValues, unknown>) => void;
  control: Control;
  trigger: UseFormTrigger<FieldValues>;
  setFocus: UseFormSetFocus<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  getFieldState: UseFormGetFieldState<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  setError: UseFormSetError<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  formState: FormState<FieldValues>;
  reset: UseFormReset<FieldValues>;
  register: UseFormRegister<FieldValues>;
} => {
  const form = useForm(props);

  const setInitialValues = (values: Record<keyof TFieldValues, unknown>) => {
    Object.keys(values).forEach((key) => {
      form.setValue(key, values[key]);
    });
  };

  return {
    ...form,
    setInitialValues,
  };
};
