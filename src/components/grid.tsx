import React, { useEffect, useRef, useState } from "react"
import { Event, User } from "@/lib/database.types"
import { Data } from "./chart"
import Tick from "./tick"
import Week from "./week"

interface Props {
  data: Data
  user?: User
  upsertEvent: (event: Event) => void
  deleteEvent?: (event: Event) => void
}

export default function Grid(props: Props) {
  const [cellSize, setCellSize] = useState(50)
  const gridRef = useRef<HTMLDivElement>(null)
  const currentTarget = useRef<HTMLButtonElement | null>(null)
  const minCellWidth = 15
  const age = new Date().getFullYear() - props.data.birthDate.getFullYear()
  const rows = Math.max(79, age + 20) + 1
  const cols = 52 + 1

  useEffect(() => {
    const currentGridRef = gridRef.current
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === currentGridRef) {
          const containerWidth = entry.contentRect.width
          const newCellSize = (containerWidth - (cols - 1)) / cols // (cols-1) for the gap
          setCellSize(newCellSize)
        }
      }
    })

    if (currentGridRef) {
      resizeObserver.observe(currentGridRef)
    }

    return () => {
      if (currentGridRef) {
        resizeObserver.unobserve(currentGridRef)
      }
    }
  }, [cols])

  return (
    <div
      ref={gridRef}
      className="grid gap-px"
      style={{
        gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
        height: `${cellSize * rows + (rows - 1)}px`, // (rows-1) for the gap
        minWidth: minCellWidth * cols + (cols - 1), // (cols-1) for the gap
      }}
    >
      {Array.from({ length: rows }).map((_, y) =>
        Array.from({ length: cols }).map((_, x) => {
          if (y == 0 && x == 0) {
            return <div key={`${x}=${y}`} className="sticky left-0 top-0 z-50 bg-muted" />
          }
          if (y == 0 && x != 0) {
            return <Tick key={`${x}=${y}`} t={x} />
          }
          if (x == 0 && y != 0) {
            return <Tick key={`${x}=${y}`} t={y - 1} vertical />
          }
          return (
            <Week
              key={`${x}=${y}`}
              year={y - 1}
              week={x}
              data={props.data}
              currentTarget={currentTarget}
              user={props.user}
              upsertEvent={props.upsertEvent}
              deleteEvent={props.deleteEvent}
            />
          )
        })
      )}
    </div>
  )
}
