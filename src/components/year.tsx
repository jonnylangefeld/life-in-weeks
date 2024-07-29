import { MutableRefObject } from "react"
import { Event, User } from "@/lib/database.types"
import { Data } from "./chart"
import Tick from "./tick"
import Week from "./week"

interface Props {
  year: number
  data: Data
  currentTarget: MutableRefObject<HTMLButtonElement | null>
  user?: User
  upsertEvent: (event: Event) => void
  deleteEvent?: (event: Event) => void
}

export default function Year(props: Props) {
  return (
    <div className="flex flex-grow flex-row contain-inline-size">
      <Tick key={props.year} t={props.year} vertical />
      {Array.from({ length: 52 }).map((_, index) => (
        <Week
          key={index}
          year={props.year}
          week={index + 1}
          data={props.data}
          currentTarget={props.currentTarget}
          user={props.user}
          upsertEvent={props.upsertEvent}
          deleteEvent={props.deleteEvent}
        />
      ))}
    </div>
  )
}
