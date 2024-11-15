import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import connectDB from './db/index.js'
import { config } from 'dotenv'

config()


const app = express()
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);
app.use(express.json())
app.use(cookieParser())

connectDB()

app.get("/", (req, res) => {
    res.send("Server is working fine")
})

app.use("/api/users", userRouter);


export default app