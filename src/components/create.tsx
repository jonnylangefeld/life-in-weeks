import { useState } from "react"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"
import { Dialog, DialogTrigger } from "./ui/dialog"
import { Database } from "@/lib/database.types"
import CreateUser from "./createUser"
import CreateEvent from "./createEvent"
import { Event } from "@/lib/database.types"

interface Props {
  loading: boolean
  user?: Database["public"]["Tables"]["users"]["Row"]
  createUser: (date: Date) => Promise<void>
  addEvent: (event: Event) => void
}

export default function Create(props: Props) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={props.loading}>
          {props.loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {props.loading ? "Loading..." : props.user ? "Create event" : "✨ Create your own!"}
        </Button>
      </DialogTrigger>
      {props.user ? (
        <CreateEvent setOpen={setOpen} addEvent={props.addEvent} />
      ) : (
        <CreateUser createUser={props.createUser} setOpen={setOpen} />
      )}
    </Dialog>
  )
}
