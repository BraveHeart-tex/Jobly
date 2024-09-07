import { zodErrorMap } from "@/lib/zodErrorMap";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type FieldValues,
  type Path,
  type UseFormProps,
  type UseFormReturn,
  useForm,
} from "react-hook-form";
import type { ZodObject } from "zod";
import { getDefaultValuesFromZodSchema } from "./utils";

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
  schema: ZodObject<any>,
  props?: UseFormProps<TFieldValues, TContext>,
): ExtendedUseFormReturn<TFieldValues, TContext, TTransformedValues> => {
  const defaultValues =
    props?.defaultValues ||
    (getDefaultValuesFromZodSchema(schema) as TFieldValues) ||
    ({} as TFieldValues);

  const form = useForm<TFieldValues, TContext, TTransformedValues>({
    ...props,
    // @ts-ignore
    defaultValues,
    resolver: zodResolver(schema, {
      errorMap: zodErrorMap,
    }),
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
