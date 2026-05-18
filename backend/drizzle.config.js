const {defineConfig} = require("drizzle-kit")
const dotenv = require("dotenv")
dotenv.config()

export default defineConfig({
    dialect: "postgresql",
    schema: "./model/schema.js",
    out: "./drizzle",
    dbCredentials: {
        url: process.env.DB_URL
    },
    verbose: true,
    strict: true
})