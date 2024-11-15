import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import connectDB from './db/index.js'
import { config } from 'dotenv'

config()


const app = express()
// app.use(cors)
app.use(express.json())
app.use(cookieParser())


app.get("/", (req, res) => {
    res.send("Server is working fine")
})

connectDB()


export default app