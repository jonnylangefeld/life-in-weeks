import { useState } from "react"
import { Data } from "./chart"
import { Popover, PopoverArrow, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Event } from "@/lib/database.types"

interface Props {
  week: number
  year: number
  data: Data
}

function dateInRange(date: Date, from: Date, to: Date): boolean {
  return from.getTime() <= date.getTime() && date.getTime() < to.getTime()
}

function dateRangeOverlap(from1: Date, to1: Date, from2: Date, to2: Date): boolean {
  return (
    (from1.getTime() < from2.getTime() && from2.getTime() < to1.getTime()) ||
    (from1.getTime() < to2.getTime() && to2.getTime() < to1.getTime())
  )
}

export default function Week(props: Props) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const endOfWeek = new Date(props.data.birthDate)
  endOfWeek.setFullYear(endOfWeek.getFullYear() + props.year)
  endOfWeek.setDate(endOfWeek.getDate() + props.week * 7)

  const beginningOfWeek = new Date(endOfWeek)
  beginningOfWeek.setDate(beginningOfWeek.getDate() - 7)

  const lived = (): boolean => {
    return endOfWeek.getTime() < today.getTime()
  }

  const getEvents = (): Event[] => {
    const events: Event[] = []
    props.data.events.forEach((event) => {
      if (
        dateInRange(event.date, beginningOfWeek, endOfWeek) ||
        (event.to_date && dateRangeOverlap(event.date, event.to_date, beginningOfWeek, endOfWeek))
      ) {
        events.push(event)
      }
    })

    events.sort((a, b) => a.date.getTime() - b.date.getTime())

    return events
  }

  const events = getEvents()
  const colors = events.filter((event) => event.color !== undefined).map((event) => event.color!)

  const tileContent = (): JSX.Element | undefined => {
    let emoji: string | undefined
    for (const event of events) {
      if (event.emoji && dateInRange(event.date, beginningOfWeek, endOfWeek)) {
        emoji = event.emoji
      }
    }
    if (emoji) {
      return (
        <svg viewBox="0 0 1000 1000" className="z-40 h-full w-full">
          <text
            style={{
              fontSize: 800,
              textAnchor: "middle",
              dominantBaseline: "central",
            }}
            x="50%"
            y="50%"
          >
            {emoji}
          </text>
        </svg>
      )
    }
    return undefined
  }

  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className="group relative aspect-square w-16 min-w-[2px] sm:m-[1px]"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <div
          className={`absolute bottom-0 flex h-full w-full items-center justify-center sm:rounded-[1px] ${lived() ? `pointer-events-none transition-all duration-1000 ease-in-out group-hover:z-50 group-hover:scale-[200%] group-hover:shadow-[0_0_10px] group-hover:shadow-background group-hover:duration-100` : "bg-accent"}`}
        >
          {lived() && (
            <>
              <div className="absolute bottom-0 grid h-full w-full grid-cols-1 overflow-clip bg-accent-foreground sm:rounded-[1px]">
                {colors.map((color, index) => (
                  <div key={index} className={`bg-${color}-300 dark:bg-${color}-200`}></div>
                ))}
              </div>
              {tileContent()}
            </>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        className="pointer-events-none text-sm shadow-lg"
        onWheel={(e) => {
          e.stopPropagation()
        }}
      >
        <div className={events.length != 0 ? "text-muted-foreground" : ""}>
          <div>
            Age {props.year} year{props.year != 1 ? "s" : ""} and {props.week} week{props.week > 1 ? "s" : ""}
          </div>
          <div>
            {beginningOfWeek.toLocaleDateString(undefined, { timeZone: "UTC" })} -{" "}
            {endOfWeek.toLocaleDateString(undefined, { timeZone: "UTC" })}
          </div>
        </div>
        {events.map((event, index) => {
          return (
            <div key={index}>
              <p className="mt-2 text-lg">
                {event.emoji} {event.title}
              </p>
              <p className="text-muted-foreground">
                {event.date.toLocaleDateString(undefined, { timeZone: "UTC" })}
                {event.to_date ? " - " + event.to_date.toLocaleDateString(undefined, { timeZone: "UTC" }) : ""}
              </p>
            </div>
          )
        })}

        <PopoverArrow className="invert dark:invert-0" />
      </PopoverContent>
    </Popover>
  )
}
