import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

// Xoá ký tự đầu tiên
// ví dụ /abc = abc
export const normalizePath = (path: string) => {
  return path.startsWith("/") ? path.slice(1) : path;
};
