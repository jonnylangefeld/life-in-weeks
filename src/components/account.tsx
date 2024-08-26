import { UserCircle } from "@phosphor-icons/react"
import { User as SupabaseUser } from "@supabase/supabase-js"
import Image from "next/image"
import { useState } from "react"
import { toast } from "sonner"
import { Database } from "@/lib/database.types"
import { getRedirectURL } from "@/lib/utils"
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
    const { error } = await supabase.auth.linkIdentity({
      provider: "google",
      options: { redirectTo: getRedirectURL() },
    })
    if (error) {
      toast.error("Error signing in:" + error.message)
      return
    }
  }

  const signIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: getRedirectURL() },
    })
    if (error) {
      toast.error("Error signing in:" + error.message)
      return
    }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast.error("Error signing out:" + error.message)
      return
    }
    window.location.reload()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={props.loading} variant={"secondary"}>
          {props.authUser?.user_metadata["picture"] ? (
            <Image
              alt=""
              src={props.authUser.user_metadata["picture"]}
              width={32}
              height={32}
              className="rounded-full"
            />
          ) : (
            <UserCircle size={32} />
          )}
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
        {props.authUser && !props.authUser.is_anonymous && (
          <Button variant={"destructive"} onClick={signOut}>
            Sign out
          </Button>
        )}
      </DialogContent>
    </Dialog>
  )
}
