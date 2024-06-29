export function isErrorObject(
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  config: any,
): config is { error: string } {
  return config && typeof config.error === "string";
}
