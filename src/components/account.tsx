import { UserCircle } from "@phosphor-icons/react"
import { User as SupabaseUser } from "@supabase/supabase-js"
import { useState } from "react"
import { toast } from "sonner"
import { Database } from "@/lib/database.types"
import { createClient } from "@/utils/supabase/client"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"

interface Props {
  loading: boolean
  user?: Database["public"]["Tables"]["users"]["Row"]
  authUser?: SupabaseUser
}

export default function Account(props: Props) {
  const supabase = createClient()
  const [open, setOpen] = useState(false)

  const linkIdentity = async () => {
    const { error } = await supabase.auth.linkIdentity({ provider: "google" })
    if (error) {
      toast.error("Error signing in:" + error.message)
      return
    }
  }

  const signIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google" })
    if (error) {
      toast.error("Error creating account:" + error.message)
      return
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={props.loading} variant={"secondary"}>
          <UserCircle size={32} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{props.user ? "Your Account" : "Sign In"}</DialogTitle>
          <DialogDescription>
            {props.authUser?.is_anonymous &&
              "You are currently creating your Life in Weeks chart as a guest. Sign in to save your data."}
            {!props.user && "Store and access your Life in Weeks calendar with your own account."}
          </DialogDescription>
        </DialogHeader>
        {props.user && <p>Your birth date: {new Date(props.user.date_of_birth).toLocaleDateString()}</p>}
        {props.authUser?.is_anonymous && <Button onClick={linkIdentity}>Sign in with Google</Button>}
        {!props.user && <Button onClick={signIn}>Sign in with Google</Button>}
      </DialogContent>
    </Dialog>
  )
}
