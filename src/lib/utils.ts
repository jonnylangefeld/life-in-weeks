import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Event } from "@/lib/database.types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseDBEvent(data: any): Event {
  data.date = new Date(data.date)
  data.to_date = data.to_date ? new Date(data.to_date) : undefined
  return data as Event
}
