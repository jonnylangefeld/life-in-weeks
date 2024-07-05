import { Merge } from 'type-fest'
import { Database as DatabaseGenerated } from './database-generated.types'
export type { Json } from './database-generated.types'

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
          Row: {
            date: Date
            to_date: Date | null
          }
        }
      }
    }
  }
>
