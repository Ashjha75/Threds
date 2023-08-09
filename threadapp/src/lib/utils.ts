import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// chatGpt
export function isBase64Image(imageData: string) {
  const base64Pattern = /^data:image\/(jpeg|png|gif|bmp);base64,/;
  return base64Pattern.test(imageData);
}