"use client"

import Chart from "@/components/chart"
import Create from "@/components/create"
import H1 from "@/components/ui/h1"
import { useEffect, useState } from "react"
import { User } from "@/lib/database.types"
import { AuthSessionMissingError } from "@supabase/supabase-js"
import { createClient } from "@/utils/supabase/client"
import { Event } from "@/lib/database.types"
import { toast } from "sonner"

export default function Home() {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | undefined>(undefined)
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    const getUser = async () => {
      setLoading(true)
      try {
        const {
          data: { user: authUser },
          error: authError,
        } = await supabase.auth.getUser()

        if (authError && authError.name !== AuthSessionMissingError.name) {
          console.log(authError, AuthSessionMissingError)
          toast.error("Authentication error:" + authError.message)
          return
        }

        if (!authUser) {
          return
        }

        const { data: user, error } = await supabase
          .from("users")
          .select(
            `
              id,
              date_of_birth,
              events(*)
          `
          )
          .single()

        if (error) {
          toast.error("Error fetching user:" + error.message)
          return
        }

        setUser({
          id: user?.id,
          date_of_birth: new Date(user?.date_of_birth),
        })
        setEvents(
          user?.events.map((e) => {
            return {
              title: e.title,
              emoji: e.emoji,
              color: e.color,
              date: new Date(e.date),
              to_date: e.to_date ? new Date(e.to_date) : undefined,
            } as Event
          }) || []
        )
      } finally {
        setLoading(false)
      }
    }

    getUser()
  }, [supabase])

  const addEvent = (event: Event) => {
    setEvents([...events, event])
  }

  return (
    <>
      <div className="flex flex-row items-center justify-between gap-1">
        <H1 className="whitespace-nowrap">My Life in Weeks</H1>
        <Create loading={loading} user={user} addEvent={addEvent} setUser={setUser} />
      </div>
      <Chart user={user} loading={loading} events={events} />
    </>
  )
}
