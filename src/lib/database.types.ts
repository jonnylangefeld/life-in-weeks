import { Merge } from 'type-fest'
import { Database as DatabaseGenerated, Tables } from './database-generated.types'
export type { Json } from './database-generated.types'

export type Event = Merge<Tables<'events'>, {
  id?: string
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
          Row: {
            id: string
            date_of_birth: Date
          }
        }
        events: {
          Row: Event
        }
      }
    }
  }
>
