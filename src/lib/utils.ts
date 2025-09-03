import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalizeWords = (str: string) =>
  str.replace(/\b\w/g, (char) => char.toUpperCase());

export const toLocalTime = (dt: number, timezone: number) => {
  const time = new Date((dt + timezone) * 1000);
  return time.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
};

export const truncateString = (text: string, length: number): string => {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
};
