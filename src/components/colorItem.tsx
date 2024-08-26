import { PiCheck } from "react-icons/pi"
import { Color } from "@/lib/types"

interface Props extends React.HTMLProps<HTMLButtonElement> {
  color: Color
  active?: boolean
}

export default function ColorItem({ color, active, onClick }: Props) {
  return (
    <button
      className="flex min-h-min flex-row flex-nowrap items-center justify-start gap-3 rounded-md p-2 text-sm hover:bg-muted"
      onClick={onClick}
    >
      <span
        className={`bg- flex size-5 items-center justify-center rounded-full ${color.toLowerCase()}-200 dark:bg-${color.toLowerCase()}-300`}
      >
        {active && <PiCheck size={32} className="h-5/6 dark:invert" />}
      </span>
      {color}
    </button>
  )
}
