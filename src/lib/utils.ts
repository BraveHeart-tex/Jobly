import { type ClassValue, clsx } from "clsx";
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
  separator: string = "-",
) => {
  if (!enumValue) return "";
  const words = enumValue.split(separator);

  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
  );

  return capitalizedWords.join(" ");
};
