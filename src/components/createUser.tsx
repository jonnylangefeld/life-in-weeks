import { Dispatch, SetStateAction, useState } from "react"
import { Button } from "./ui/button"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Calendar } from "./ui/calendar"

interface Props {
  createUser: (date: Date) => Promise<void>
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default function CreateUser({ createUser, setOpen }: Props) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const now = new Date()

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>What's your date of birth?</DialogTitle>
        <DialogDescription>
          With your date of birth we can show the part of your life that you've already lived.
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-row justify-center">
        <Calendar
          mode="single"
          captionLayout="dropdown"
          fromYear={now.getFullYear() - 100}
          toYear={now.getFullYear()}
          onSelect={setDate}
          selected={date}
        />
      </div>
      <DialogFooter>
        <Button
          onClick={() => {
            setOpen(false)
            createUser(date!)
          }}
        >
          Create!
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
