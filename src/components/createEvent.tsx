import { Dispatch, SetStateAction, useState } from "react"
import { Button } from "./ui/button"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"

interface Props {
  createEvent: () => Promise<void>
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default function CreateEvent({ createEvent, setOpen }: Props) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create a new life event!</DialogTitle>
        <DialogDescription>Foobar</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button
          onClick={() => {
            createEvent()
            setOpen(false)
          }}
        >
          Create!
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
