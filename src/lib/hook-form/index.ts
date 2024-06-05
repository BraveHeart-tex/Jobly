import { type FieldValues, type Path, useForm, type UseFormProps, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ZodObject } from "zod";
import { zodErrorMap } from "@/lib/zodErrorMap";

type ExtendedUseFormReturn<
  TFieldValues extends FieldValues,
  TContext,
  TTransformedValues extends FieldValues | undefined,
> = UseFormReturn<TFieldValues, TContext, TTransformedValues> & {
  setInitialValues: (values: Record<keyof TFieldValues, unknown>) => void;
};

export const useExtendedForm = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = undefined,
  TTransformedValues extends FieldValues | undefined = undefined,
>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: ZodObject<any>,
  props?: UseFormProps<TFieldValues, TContext>,
): ExtendedUseFormReturn<TFieldValues, TContext, TTransformedValues> => {
  const form = useForm<TFieldValues, TContext, TTransformedValues>({
    ...props,
    resolver: zodResolver(schema, {
      errorMap: zodErrorMap,
    }),
  });

  const setInitialValues = (values: Record<Path<TFieldValues>, unknown>) => {
    (Object.keys(values) as Array<Path<TFieldValues>>).forEach((key) => {
      form.setValue(key, values[key] as never);
    });
  };

  return {
    ...form,
    setInitialValues,
  };
};
