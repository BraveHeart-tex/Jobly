export const getAvatarPlaceholder = (text: string): string => {
  const words = text.split(" ");
  const initials = words.map((word) => {
    let initial = word.charAt(0).toUpperCase();
    for (let i = 1; i < word.length; i++) {
      if (/[a-zA-Z]/.test(word.charAt(i))) {
        initial += word.charAt(i).toUpperCase();
        break;
      }
    }
    return initial;
  });

  return initials.join("").slice(0, 2);
};

export const capitalizeWord = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
export const generateReadableEnumLabel = (
  enumValue: string | null,
  separator = "-",
) => {
  if (!enumValue) return "";
  const words = enumValue.split(separator);

  const capitalizedWords = words.map(capitalizeWord);

  return capitalizedWords.join(" ");
};

export const capitalizeString = <T extends string>(
  string: string,
): Capitalize<T> =>
  (string.charAt(0).toUpperCase() + string.slice(1)) as Capitalize<T>;

export const matchPathnameToEditPath = (path: string): boolean => {
  const pattern = /^\/home\/candidate\/tools\/.*\/edit\/\d+$/;
  return pattern.test(path);
};

export const removeHTMLTags = (htmlString: string) => {
  return htmlString.replace(/<[^>]*>/g, "");
};
