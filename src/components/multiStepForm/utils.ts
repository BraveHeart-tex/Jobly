export const makeStepToFieldsMap = (
  FIELD_TO_STEP_MAP: Record<string, number>,
) => {
  return Object.entries(FIELD_TO_STEP_MAP).reduce<Record<number, string[]>>(
    (acc, [field, step]) => {
      if (!acc[step]) {
        acc[step] = [];
      }

      // biome-ignore lint/style/noNonNullAssertion: It cannot be undefined at this point
      acc[step]!.push(field);

      return acc;
    },
    {},
  );
};
