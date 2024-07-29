import React from "react"
import { cn } from "@/lib/utils"

export default function H1({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <h1 {...props} className={cn("mb-2 text-xl font-bold md:mb-4 md:text-2xl", props.className)}>
      {children}
    </h1>
  )
}
