"use client"

import { createClient } from "@/utils/supabase/client"
import { User } from "@supabase/supabase-js"
import { useCallback, useEffect, useState } from "react"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"

export default function Create() {
  const supabase = createClient()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const getUser = useCallback(async () => {
    setLoading(true)
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()
    setUser(user)
    setLoading(false)
  }, [supabase])

  useEffect(() => {
    getUser()
  }, [getUser])

  const createUser = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.signInAnonymously()
    setUser(user)
  }

  const createEvent = () => {
    console.log("Creating event")
  }

  return (
    <Button disabled={loading} onClick={loading ? undefined : user ? createEvent : createUser}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {loading ? "Loading..." : user ? "Create event" : "✨ Create your own!"}
    </Button>
  )
}
