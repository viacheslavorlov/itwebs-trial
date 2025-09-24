import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}



export const breakpoints = [
  {
    label: 'Mobile',
    name: 'mobile',
    width: 375,
    height: 667,
  },
  {
    label: 'Tablet',
    name: 'tablet',
    width: 768,
    height: 1024,
  },
  {
    label: 'Desktop',
    name: 'desktop',
    width: 1440,
    height: 900,
  },
]


