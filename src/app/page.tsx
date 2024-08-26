"use client"

import { User as SupabaseUser } from "@supabase/supabase-js"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import Account from "@/components/account"
import Chart from "@/components/chart"
import Create from "@/components/create"
import H1 from "@/components/ui/h1"
import { Event, User } from "@/lib/database.types"
import { getRedirectURL, parseDBEvent } from "@/lib/utils"
import { createClient } from "@/utils/supabase/client"

export default function Home() {
  const supabase = createClient()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [authUser, setAuthUser] = useState<SupabaseUser | undefined>(undefined)
  const [user, setUser] = useState<User | undefined>(undefined)
  const [eventMap, setEventMap] = useState(new Map<string, Event>())

  useEffect(() => {
    if (searchParams.get("code")) {
      const newSearchParams = new URLSearchParams(searchParams.toString())
      newSearchParams.delete("code")
      router.replace(pathname + "?" + newSearchParams.toString())
    }

    if (
      searchParams.get("error") == "server_error" &&
      searchParams.get("error_code") == "422" &&
      searchParams.get("error_description") == "Identity is already linked to another user"
    ) {
      // At this point we lost the `sb-127-auth-token` cookie, so we don't have the previous anonymous session anymore.
      // We can only log in as the existing account.
      // Maybe this issue reveals a solution one day: https://github.com/supabase/auth/issues/1525#issuecomment-2309017426s
      toast.info("The Account you logged in with already exists. Logging you in...")
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
      signIn()
    }

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
          setAuthUser(authUser)
          if (error.details == "The result contains 0 rows") {
            // If someone created an oAuth account but hasn't created their life in weeks chart yet
            return
          }
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
        setAuthUser(authUser)
      } finally {
        setLoading(false)
      }
    }

    getUser()
  }, [supabase, pathname, router, searchParams])

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
          <Create
            loading={loading}
            user={user}
            authUser={authUser}
            upsertEvent={upsertEvent}
            setUser={setUser}
            setAuthUser={setAuthUser}
          />
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
