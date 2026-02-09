import express from 'express'
import {connectDB, env} from './config/index.js'

const app = express()

// Middleware
app.use(express.json())

// DB Connection
connectDB().then(() => {
    console.log("DB Connection Established")
    app.listen(3000, () => {
        console.log(`Server is running on port: ${env.PORT}`)
    })
}).catch((error) => {
    console.log(error?.message)
})