import { type ClassValue, clsx } from "clsx";
import type { StringMap } from "quill";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

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

  // Join the initials and slice to ensure only 2 characters
  return initials.join("").slice(0, 2);
};

export const generateReadableEnumLabel = (
  enumValue: string | null,
  separator = "-",
) => {
  if (!enumValue) return "";
  const words = enumValue.split(separator);

  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
  );

  return capitalizedWords.join(" ");
};

export const pick = <T extends Record<string, unknown>, K extends keyof T>(
  baseObject: T,
  keysToPick: K[],
): Partial<T> => {
  return keysToPick.reduce(
    (acc, key) => {
      if (key in baseObject) {
        acc[key] = baseObject[key];
      }
      return acc;
    },
    {} as Partial<T>,
  );
};

export const exclude = <T extends Record<string, unknown>, K extends keyof T>(
  baseObject: T,
  keysToRemove: K[],
): Omit<T, K> => {
  return (Object.keys(baseObject) as K[]).reduce(
    (acc, key) => {
      if (!keysToRemove.includes(key)) {
        // @ts-ignore
        acc[key] = baseObject[key];
      }
      return acc;
    },
    {} as Omit<T, K>,
  );
};

export const capitalizeString = <T extends string>(
  string: string,
): Capitalize<T> =>
  (string.charAt(0).toUpperCase() + string.slice(1)) as Capitalize<T>;

type FormattingType = "bold" | "italic" | "underline" | "strike" | "blockquote";
interface ToolbarConfig {
  headers?: boolean;
  formatting?: FormattingType[];
  lists?: boolean;
  links?: boolean;
  images?: boolean;
  clean?: boolean;
}

export const generateEditorModules = (config: ToolbarConfig): StringMap => {
  const toolbarItems: [boolean | string[] | undefined, unknown][] = [
    [config.headers, [{ header: [1, 2, false] }]],
    [config.formatting, config.formatting],
    [config.lists, [{ list: "ordered" }, { list: "bullet" }]],
    [config.links, ["link"]],
    [config.images, ["image"]],
    [config.clean, ["clean"]],
  ];

  const toolbar = toolbarItems
    .filter(([condition]) => condition)
    .map(([, item]) => item);

  return { toolbar };
};
