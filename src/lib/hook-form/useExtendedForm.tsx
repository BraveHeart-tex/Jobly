import {
  type FieldValues,
  type Path,
  type UseFormProps,
  type UseFormReturn,
  useForm,
} from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import type { ObjectSchema } from "valibot";

export type ExtendedUseFormReturn<
  TFieldValues extends FieldValues,
  TContext,
  TTransformedValues extends FieldValues | undefined,
> = UseFormReturn<TFieldValues, TContext, TTransformedValues> & {
  setInitialValues: (values: Record<keyof TFieldValues, unknown>) => void;
  getErroredKeys: () => Array<keyof TFieldValues>;
};

export const useExtendedForm = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = undefined,
  TTransformedValues extends FieldValues | undefined = undefined,
>(
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  validator: ObjectSchema<any, any>,
  props?: UseFormProps<TFieldValues, TContext>,
): ExtendedUseFormReturn<TFieldValues, TContext, TTransformedValues> => {
  const form = useForm<TFieldValues, TContext, TTransformedValues>({
    ...props,
    resolver: valibotResolver(validator),
  });

  const setInitialValues = (values: Record<Path<TFieldValues>, unknown>) => {
    const keys = Object.keys(values) as Array<Path<TFieldValues>>;
    for (const key of keys) {
      form.setValue(key, values[key] as never);
    }
  };

  const getErroredKeys = () => {
    return Object.keys(form.formState.errors) as Array<keyof TFieldValues>;
  };

  return {
    ...form,
    setInitialValues,
    getErroredKeys,
  };
};
