import { type ClassValue, clsx } from "clsx"
import { Event } from "@/lib/database.types"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseDBEvent(data: any): Event {
  data.date = new Date(data.date)
  data.to_date = data.to_date ? new Date(data.to_date) : undefined
  return data as Event
}
