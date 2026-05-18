const { serial } = require("drizzle-orm/pg-core")
const { pgTable } = require("drizzle-orm/pg-core")
const { timestamp, varchar, text } = require("drizzle-orm/pg-core")

const users = pgTable("users", {
    id: serial('id').primaryKey().notNull(),
    email: text("email").notNull(),
    username: varchar("user_name", { length: 200 }).notNull(),
    password: text("password").notNull(),
    created_at: timestamp().defaultNow()
})

module.exports = {
    users
}