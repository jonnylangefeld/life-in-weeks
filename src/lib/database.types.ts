import { Merge } from 'type-fest'
import { Database as DatabaseGenerated, Tables } from './database-generated.types'
export type { Json } from './database-generated.types'

export type User = Merge<Tables<'users'>, {
  // id: string
  date_of_birth: Date
}>

export type Event = Merge<Tables<'events'>, {
  id?: string
  title: string
  user_id?: string
  date: Date
  to_date?: Date
  emoji?: string
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
}>

// Override the type for a specific column in a view:
export type Database = Merge<
  DatabaseGenerated,
  {
    public: {
      Tables: {
        users: {
          Row: User
        }
        events: {
          Row: Event
        }
      }
    }
  }
>
