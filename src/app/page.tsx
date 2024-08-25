"use client"

import { User as SupabaseUser } from "@supabase/supabase-js"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import Account from "@/components/account"
import Chart from "@/components/chart"
import Create from "@/components/create"
import H1 from "@/components/ui/h1"
import { Event, User } from "@/lib/database.types"
import { parseDBEvent } from "@/lib/utils"
import { createClient } from "@/utils/supabase/client"

export default function Home() {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [authUser, setAuthUser] = useState<SupabaseUser | undefined>(undefined)
  const [user, setUser] = useState<User | undefined>(undefined)
  const [eventMap, setEventMap] = useState(new Map<string, Event>())

  useEffect(() => {
    const getUser = async () => {
      setLoading(true)
      try {
        const {
          data: { user: authUser },
          error: authError,
        } = await supabase.auth.getUser()

        if (authError && authError.message !== "Auth session missing!") {
          toast.error("Authentication error: " + authError.message)
          return
        }

        if (!authUser) {
          return
        }

        setAuthUser(authUser)

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
        setEventMap(
          new Map<string, Event>(
            user?.events.map((e) => {
              const event = parseDBEvent(e)
              return [event.id!, event]
            }) || []
          )
        )
      } finally {
        setLoading(false)
      }
    }

    getUser()
  }, [supabase])

  const upsertEvent = (event: Event) => {
    setEventMap((prevMap) => new Map(prevMap).set(event.id!, event))
  }

  const deleteEvent = (event: Event) => {
    setEventMap((prevMap) => {
      const newMap = new Map(prevMap)
      newMap.delete(event.id!)
      return newMap
    })
  }

  return (
    <>
      <div className="flex flex-row items-center justify-between gap-1">
        <H1 className="whitespace-nowrap">My Life in Weeks</H1>
        <div className="flex flex-row gap-1">
          <Account loading={loading} user={user} authUser={authUser} />
          <Create loading={loading} user={user} upsertEvent={upsertEvent} setUser={setUser} setAuthUser={setAuthUser} />
        </div>
      </div>
      <Chart
        user={user}
        loading={loading}
        events={Array.from(eventMap.values())}
        upsertEvent={upsertEvent}
        deleteEvent={deleteEvent}
      />
    </>
  )
}
