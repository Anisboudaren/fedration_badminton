import { clsx, type ClassValue } from "clsx";
import type { StaticImageData } from "next/image";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type AssetImport = string | StaticImageData;

export function assetUrl(src: AssetImport): string {
  return typeof src === "string" ? src : src.src;
}
