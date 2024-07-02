"use client"

import { createClient } from "@/utils/supabase/client"
import { User } from "@supabase/supabase-js"
import { useCallback, useEffect, useState } from "react"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Calendar } from "./ui/calendar"

export default function Create() {
  const supabase = createClient()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [date, setDate] = useState<Date | undefined>(new Date())
  console.log(date)

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
    <Dialog open={true}>
      <DialogTrigger asChild>
        <Button disabled={loading} onClick={loading ? undefined : user ? createEvent : undefined}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {loading ? "Loading..." : user ? "Create event" : "✨ Create your own!"}
        </Button>
      </DialogTrigger>
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
            fromYear={2010}
            toYear={2024}
            onSelect={setDate}
            selected={date}
          />
        </div>
        <DialogFooter>
          <Button>Create!</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
