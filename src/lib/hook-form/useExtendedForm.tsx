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

type ExtendedUseFormReturn<
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
  const form = useForm<TFieldValues, TContext, TTransformedValues>({
    ...props,
    resolver: zodResolver(schema, {
      errorMap: zodErrorMap,
    }),
    mode: "onChange",
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

  // TODO: Set default values from schema

  return {
    ...form,
    setInitialValues,
    getErroredKeys,
  };
};
