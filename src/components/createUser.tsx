import { User as SupabaseUser } from "@supabase/supabase-js"
import { Loader2 } from "lucide-react"
import { Dispatch, SetStateAction, useState } from "react"
import { toast } from "sonner"
import { User } from "@/lib/database.types"
import { createClient } from "@/utils/supabase/client"
import { Button } from "./ui/button"
import { Calendar } from "./ui/calendar"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>
  authUser?: SupabaseUser
  setUser: Dispatch<SetStateAction<User | undefined>>
  setAuthUser: Dispatch<SetStateAction<SupabaseUser | undefined>>
}

export default function CreateUser(props: Props) {
  const supabase = createClient()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [loading, setLoading] = useState(false)
  const now = new Date()

  const createUser = async () => {
    setLoading(true)
    try {
      let authUserID = props.authUser?.id
      if (!props.authUser) {
        const {
          data: { user: authUser },
          error: authError,
        } = await supabase.auth.signInAnonymously()

        if (authError) {
          toast.error("Authentication error:" + authError.message)
          return
        }

        if (!authUser) {
          toast.error("Authentication error: User not found")
          return
        }
        props.setAuthUser(authUser)
        authUserID = authUser.id
      }

      const user: User = {
        id: authUserID!,
        date_of_birth: date!,
      }

      const { error } = await supabase.from("users").upsert([user])
      if (error) {
        toast.error("Error creating user:" + error.message)
        return
      }
      props.setUser(user)
      props.setOpen(false)
    } finally {
      setLoading(false)
    }
  }

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
        <Button disabled={loading} onClick={createUser}>
          {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
          {loading ? "Loading..." : "Create"}
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
