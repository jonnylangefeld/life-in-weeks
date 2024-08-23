import { createClient } from "@/utils/supabase/server"

export async function GET(_: Request) {
  const supabase = createClient()
  const { data, error } = await supabase.rpc("keep_alive")
  if (error) {
    return new Response(error.message, { status: 500 })
  }
  return new Response(JSON.stringify(data), { status: 200 })
}
