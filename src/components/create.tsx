import { Dispatch, SetStateAction, useState } from "react"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"
import { Dialog, DialogTrigger } from "./ui/dialog"
import { Database, User } from "@/lib/database.types"
import CreateUser from "./createUser"
import UpsertEvent from "./upsertEvent"
import { Event } from "@/lib/database.types"

interface Props {
  loading: boolean
  user?: Database["public"]["Tables"]["users"]["Row"]
  addEvent: (event: Event) => void
  setUser: Dispatch<SetStateAction<User | undefined>>
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
        <UpsertEvent setOpen={setOpen} addEvent={props.addEvent} />
      ) : (
        <CreateUser setOpen={setOpen} setUser={props.setUser} />
      )}
    </Dialog>
  )
}
