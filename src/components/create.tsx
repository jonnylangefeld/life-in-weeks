import { Loader2 } from "lucide-react"
import { Dispatch, SetStateAction, useState } from "react"
import { Database, User } from "@/lib/database.types"
import { Event } from "@/lib/database.types"
import CreateUser from "./createUser"
import { Button } from "./ui/button"
import { Dialog, DialogTrigger } from "./ui/dialog"
import UpsertEvent from "./upsertEvent"

interface Props {
  loading: boolean
  user?: Database["public"]["Tables"]["users"]["Row"]
  upsertEvent: (event: Event) => void
  setUser: Dispatch<SetStateAction<User | undefined>>
}

export default function Create(props: Props) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={props.loading}>
          {props.loading && <Loader2 className="mr-2 size-4 animate-spin" />}
          {props.loading ? "Loading..." : props.user ? "Create event" : "✨ Create your own!"}
        </Button>
      </DialogTrigger>
      {props.user ? (
        <UpsertEvent setOpen={setOpen} upsertEvent={props.upsertEvent} />
      ) : (
        <CreateUser setOpen={setOpen} setUser={props.setUser} />
      )}
    </Dialog>
  )
}
