import { Color } from "@/lib/types"
import { Check } from "@phosphor-icons/react"

interface Props {
  color: Color
}

export default function ColorItem({ color }: Props) {
  return (
    <div className="flex flex-row flex-nowrap items-center justify-start gap-1">
      <span
        className={`mr-1 flex h-5 w-5 items-center justify-center rounded-full bg-${color.toLowerCase()}-300 dark:bg-${color.toLowerCase()}-200`}
      >
        <Check size={32} className="h-5/6" />
      </span>
      {color}
    </div>
  )
}
