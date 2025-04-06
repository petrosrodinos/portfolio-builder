import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateInitials = (value: string) => {
  if (!value) return "AN";
  const names = value.split(" ");
  const initials = names.map((name) => name[0]).join("").toUpperCase();
  return initials;
}