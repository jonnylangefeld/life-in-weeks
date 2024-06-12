import { cn } from "@/lib/utils"
import React from "react"

export default function H1({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <h1 {...props} className={cn("mb-4 text-2xl font-bold", props.className)}>
      {children}
    </h1>
  )
}
