import { Dispatch, SetStateAction, useState } from "react"
import { Button } from "./ui/button"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Calendar } from "./ui/calendar"
import { toast } from "sonner"
import { User } from "@/lib/database.types"
import { createClient } from "@/utils/supabase/client"
import { Loader2 } from "lucide-react"

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>
  setUser: Dispatch<SetStateAction<User | undefined>>
}

export default function CreateUser(props: Props) {
  const supabase = createClient()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [loading, setLoading] = useState(false)
  const now = new Date()

  const createUser = async () => {
    setLoading(true)
    try {
      const {
        data: { user: authUser },
        error: authError,
      } = await supabase.auth.signInAnonymously()

      if (authError) {
        toast.error("Authentication error:" + authError.message)
        return
      }

      const user: User = {
        id: authUser?.id!,
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
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {loading ? "Loading..." : "Create"}
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
