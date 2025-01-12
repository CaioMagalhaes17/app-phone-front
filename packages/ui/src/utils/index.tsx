import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export * from './types'

export const cn = (...classes: ClassValue[]) => twMerge(clsx(classes));
