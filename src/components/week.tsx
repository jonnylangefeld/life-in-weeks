import { MutableRefObject, useMemo, useState } from "react"
import { PiPencilSimple } from "react-icons/pi"
import { Event, User } from "@/lib/database.types"
import { Data } from "./chart"
import { Dialog, DialogTrigger } from "./ui/dialog"
import { Popover, PopoverArrow, PopoverContent, PopoverTrigger } from "./ui/popover"
import UpsertEvent from "./upsertEvent"

interface Props {
  week: number
  year: number
  data: Data
  currentTarget: MutableRefObject<HTMLButtonElement | null>
  user?: User
  upsertEvent: (event: Event) => void
  deleteEvent?: (event: Event) => void
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

const EditDialog: React.FC<Props & { event: Event }> = (props) => {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="flex h-full cursor-pointer flex-col justify-center text-muted-foreground hover:text-foreground">
          <PiPencilSimple size={20} />
        </div>
      </DialogTrigger>
      <UpsertEvent
        event={props.event}
        setOpen={setOpen}
        upsertEvent={props.upsertEvent}
        deleteEvent={props.deleteEvent}
      />
    </Dialog>
  )
}

export default function Week(props: Props) {
  const [open, setOpen] = useState(false)

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const endOfWeek = useMemo(() => {
    const date = new Date(props.data.birthDate)
    date.setFullYear(date.getFullYear() + props.year)
    date.setDate(date.getDate() + props.week * 7)
    return date
  }, [props.data.birthDate, props.year, props.week])

  const beginningOfWeek = useMemo(() => {
    const date = new Date(endOfWeek)
    date.setDate(date.getDate() - 7)
    return date
  }, [endOfWeek])

  const lived = (): boolean => {
    return endOfWeek.getTime() < today.getTime()
  }

  const events = useMemo(() => {
    const filterEvents = (): Event[] => {
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
    return filterEvents()
  }, [beginningOfWeek, endOfWeek, props.data.events])
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
        <svg viewBox="0 0 1000 1000" className="z-20 size-full">
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

  const onOpenChange = (open: boolean) => {
    setOpen(open)
    if (!open) {
      props.currentTarget.current = null
    }
  }

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger
        className="group relative size-full focus-visible:outline-none"
        onMouseEnter={() => {
          if (!props.currentTarget.current) {
            setOpen(true)
          }
        }}
        onMouseLeave={() => {
          if (!props.currentTarget.current) {
            setOpen(false)
          }
        }}
        onDoubleClick={() => console.log("double click")}
        onTouchStart={() => console.log("touch start")}
        onTouchEnd={() => console.log("touch end")}
        onClick={(e) => {
          e.preventDefault()
          setOpen(true)
          props.currentTarget.current = e.currentTarget
        }}
      >
        <div
          className={`absolute bottom-0 flex size-full items-center justify-center sm:rounded-[1px] ${lived() ? `pointer-events-none transition-all duration-1000 ease-in-out group-hover:z-30 group-hover:scale-[200%] group-hover:shadow-[0_0_10px] group-hover:shadow-background group-hover:duration-100` : "bg-accent"}`}
        >
          {lived() && (
            <>
              <div className="absolute bottom-0 grid size-full grid-cols-1 overflow-clip bg-accent-foreground sm:rounded-[1px]">
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
        className="text-sm shadow-lg"
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
            <div key={index} className="flex flex-row">
              <div className="flex flex-grow flex-col">
                <p className="mt-2 text-lg">
                  {event.emoji} {event.title}
                </p>
                <p className="text-muted-foreground">
                  {event.date.toLocaleDateString(undefined, { timeZone: "UTC" })}
                  {event.to_date ? " - " + event.to_date.toLocaleDateString(undefined, { timeZone: "UTC" }) : ""}
                </p>
              </div>
              {props.user && <EditDialog {...props} event={event} />}
            </div>
          )
        })}

        <PopoverArrow className="invert dark:invert-0" />
      </PopoverContent>
    </Popover>
  )
}
