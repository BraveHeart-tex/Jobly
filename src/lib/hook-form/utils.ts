import { z } from "zod";

type InferredDefaults<T extends z.ZodTypeAny> = {
  [K in keyof z.infer<T>]: z.infer<T>[K] | undefined;
};

type GenericSchemaType =
  // biome-ignore lint/suspicious/noExplicitAny:
  | z.ZodObject<any, any>
  // biome-ignore lint/suspicious/noExplicitAny:
  | z.ZodEffects<z.ZodObject<any, any>>;

export function getDefaultValuesFromZodSchema<T extends GenericSchemaType>(
  schema: T,
): InferredDefaults<T> {
  const schemaShape = getSchemaShape(schema);

  return Object.fromEntries(
    Object.entries(schemaShape)
      .map(([key, value]) => {
        return [key, getSchemaDefaultValue(value, key)];
      })
      .filter(([_key, value]) => value !== undefined),
  ) as InferredDefaults<T>;
}

function getSchemaShape<T extends GenericSchemaType>(schema: T): z.ZodRawShape {
  if (schema instanceof z.ZodEffects) {
    return getSchemaShape(schema.innerType() as T);
  }
  return schema.shape;
}

function getSchemaDefaultValue<S extends z.ZodTypeAny>(
  schema: S,
  key: string,
): z.infer<S> | undefined {
  if (schema instanceof z.ZodDefault) {
    return schema._def.defaultValue();
  }
  if (schema instanceof z.ZodEffects) {
    return getSchemaDefaultValue(schema.innerType(), key);
  }
  if (!("innerType" in schema._def)) {
    return undefined;
  }
  return getSchemaDefaultValue(schema._def.innerType as z.ZodTypeAny, key);
}
