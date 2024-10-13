import {
  type FieldValues,
  type UseFormProps,
  type UseFormReturn,
  useForm,
  type DefaultValues,
} from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { getDefaults, type ObjectSchema } from "valibot";

export type ExtendedUseFormReturn<
  TFieldValues extends FieldValues,
  TContext,
  TTransformedValues extends FieldValues | undefined,
> = UseFormReturn<TFieldValues, TContext, TTransformedValues> & {
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
  const defaultValuesFromSchema = getDefaults(
    validator,
  ) as DefaultValues<TFieldValues>;

  const filteredDefaultValues = Object.keys(defaultValuesFromSchema).reduce(
    (acc, key) => {
      if (defaultValuesFromSchema[key] !== undefined) {
        acc[key] = defaultValuesFromSchema[key];
      }
      return acc;
    },
    {} as DefaultValues<TFieldValues>,
  );

  const form = useForm<TFieldValues, TContext, TTransformedValues>({
    ...props,
    defaultValues: {
      ...filteredDefaultValues,
      ...(props?.defaultValues || {}),
    },
    resolver: valibotResolver(validator),
  });

  const getErroredKeys = () => {
    return Object.keys(form.formState.errors) as Array<keyof TFieldValues>;
  };

  return {
    ...form,
    getErroredKeys,
  };
};
