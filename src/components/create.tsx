import { User as SupabaseUser } from "@supabase/supabase-js"
import { Loader2 } from "lucide-react"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Database, User } from "@/lib/database.types"
import { Event } from "@/lib/database.types"
import CreateUser from "./createUser"
import { Button } from "./ui/button"
import { Dialog, DialogTrigger } from "./ui/dialog"
import UpsertEvent from "./upsertEvent"

interface Props {
  loading: boolean
  user?: Database["public"]["Tables"]["users"]["Row"]
  authUser?: SupabaseUser
  upsertEvent: (event: Event) => void
  setUser: Dispatch<SetStateAction<User | undefined>>
  setAuthUser: Dispatch<SetStateAction<SupabaseUser | undefined>>
}

export default function Create(props: Props) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen((props.authUser && !props.user) || false)
  }, [props.authUser, props.user])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={props.loading} className="px-2 sm:px-4">
          {props.loading && <Loader2 className="mr-2 size-4 animate-spin" />}
          {props.loading ? "Loading..." : props.user ? "Create event" : "✨ Create your own!"}
        </Button>
      </DialogTrigger>
      {props.user ? (
        <UpsertEvent setOpen={setOpen} upsertEvent={props.upsertEvent} />
      ) : (
        <CreateUser
          setOpen={setOpen}
          setUser={props.setUser}
          setAuthUser={props.setAuthUser}
          authUser={props.authUser}
        />
      )}
    </Dialog>
  )
}
