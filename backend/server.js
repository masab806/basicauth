const express = require("express")
const app = express()
const cors = require("cors")
const bcrypt = require("bcrypt")
const { db } = require("./config/db.config")
const { users } = require("./model/schema")
const { eq } = require("drizzle-orm")

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cors({
    origin: process.env.ORIGIN
}))

app.use("/register", async (req,res)=> {
    try {
        const {email, username, password} = req.body

        if(!email || !username || !password){
            return res.status(401).json({
                message: "All Fields Required!"
            })
        }

        const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1)
        .then(r => r[0])

        if(existingUser){
            return res.status(400).json({
                message: "User Already Exists!"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await db
        .insert(users)
        .values({
            email: email,
            username: username,
            password: hashedPassword
        })
        .returning()

        return res.status(200).json({
            success: true,
            newUser
        })

    } catch (error) {
        console.log("An Error Occured: ", error)
    }
})

app.use("/login", async (req,res)=> {
    try {
        const {email, password} = req.body

        if(!email || !password){
            return res.status(401).json({
                message: "All Fields Required!"
            })
        }

        const user = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1)
        .then(r => r[0])

        if(!user){
            return res.status(400).json({
                message: "Invalid Credentials"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(401).json({
                message: "Invalid Credentials"
            })
        }

        return res.status(200).json({
            success: true,
            user,
            message: "Login Successfull"
        })

    } catch (error) {
        console.log("An Error Occured: ", error)
    }
})


app.listen(3000, ()=> {
    console.log("Server is Running AT 3000")
})