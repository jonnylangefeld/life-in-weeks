import { useState } from "react"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"
import { Dialog, DialogTrigger } from "./ui/dialog"
import { Database } from "@/lib/database.types"
import CreateUser from "./createUser"
import CreateEvent from "./createEvent"

interface Props {
  loading: boolean
  user?: Database["public"]["Tables"]["users"]["Row"]
  createUser: (date: Date) => Promise<void>
  createEvent: () => Promise<void>
}

export default function Create({ loading, user, createUser, createEvent }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {loading ? "Loading..." : user ? "Create event" : "✨ Create your own!"}
        </Button>
      </DialogTrigger>
      {user ? (
        <CreateEvent createEvent={createEvent} setOpen={setOpen} />
      ) : (
        <CreateUser createUser={createUser} setOpen={setOpen} />
      )}
    </Dialog>
  )
}
