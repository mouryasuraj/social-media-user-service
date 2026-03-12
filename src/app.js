import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import {allowedHeaders, allowedMethods, connectDB, env} from './config/index.js'
import { userRouter } from './routes/index.js'

const app = express()

// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:env.CLIENT_URL,
    credentials:true,
    allowedHeaders:allowedHeaders,
    methods:allowedMethods
}))

// Route
app.use("/user",userRouter)



// DB Connection
connectDB().then(() => {
    console.log("DB Connection Established")
    app.listen(env.PORT, () => {
        console.log(`Server is running on port: ${env.PORT}`)
    })
}).catch((error) => {
    console.log(error?.message)
})