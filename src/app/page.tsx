"use client"

import Chart from "@/components/chart"
import Create from "@/components/create"
import H1 from "@/components/ui/h1"
import { useEffect, useState } from "react"
import { Database } from "@/lib/database.types"
import { User } from "@supabase/supabase-js"
import { createClient } from "@/utils/supabase/client"

export interface Event {
  title?: string
  emoji?: string
  date: Date
  toDate?: Date
  color?:
    | "slate"
    | "gray"
    | "zinc"
    | "neutral"
    | "stone"
    | "red"
    | "orange"
    | "amber"
    | "yellow"
    | "lime"
    | "green"
    | "emerald"
    | "teal"
    | "cyan"
    | "sky"
    | "blue"
    | "indigo"
    | "violet"
    | "purple"
    | "fuchsia"
    | "pink"
    | "rose"
}

export default function Home() {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [authUser, setAuthUser] = useState<User | null>(null)
  const [user, setUser] = useState<Database["public"]["Tables"]["users"]["Row"] | undefined>(undefined)
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    const getUser = async () => {
      setLoading(true)
      const {
        data: { user: authUser },
        error,
      } = await supabase.auth.getUser()

      if (authUser) {
        const { data: user } = await supabase
          .from("users")
          .select(
            `
              id,
              date_of_birth,
              events(*)
          `
          )
          .single()
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
              toDate: e.to_date ? new Date(e.to_date) : undefined,
            } as Event
          }) || []
        )
      }

      setLoading(false)
    }

    getUser()
  }, [supabase])

  const createUser = async (date: Date) => {
    setLoading(true)
    const {
      data: { user: authUser },
      error: authError,
    } = await supabase.auth.signInAnonymously()
    setAuthUser(authUser)

    const user: Database["public"]["Tables"]["users"]["Row"] = {
      id: authUser?.id!,
      date_of_birth: date,
    }

    const { error: postgressError } = await supabase.from("users").upsert([user])
    setUser(user)
    setLoading(false)
  }

  const createEvent = async () => {
    console.log("Creating event")
  }

  return (
    <>
      <div className="flex flex-row items-center justify-between gap-1">
        <H1 className="whitespace-nowrap">My Life in Weeks</H1>
        <Create loading={loading} user={user} createUser={createUser} createEvent={createEvent} />
      </div>
      <Chart user={user} loading={loading} events={events} />
    </>
  )
}
