import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Event } from "@/lib/database.types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseDBEvent(data: any): Event {
  data.date = new Date(data.date)
  data.to_date = data.to_date ? new Date(data.to_date) : undefined
  return data as Event
}

export function getRedirectURL() {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ??
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    "http://localhost:3000/"
  // Make sure to include `https://` when not localhost.
  url = url.startsWith("http") ? url : `https://${url}`
  // Make sure to include a trailing `/`.
  url = url.endsWith("/") ? url : `${url}/`
  return url
}
