import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

// Create PostgreSQL connection
const connectionString = process.env.DATABASE_URL || ''

let db: any = null
let client: any = null

if (connectionString) {
  client = postgres(connectionString, {
    prepare: false,
  })

  // Create Drizzle instance
  db = drizzle(client, { schema })
} else {
  // Mock db for development/build if no database is available
  db = {
    query: {},
    insert: () => ({ values: () => ({ returning: () => ({}) }) }),
    update: () => ({ set: () => ({ where: () => ({}) }) }),
    delete: () => ({ where: () => ({}) }),
    select: () => ({ from: () => ({ where: () => ({}) }) }),
  } as any
}

export { db }
export type Database = typeof db
