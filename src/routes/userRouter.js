import express from 'express'
import { verifyToken } from '../middleware/index.js'
import { handleCreateProfile, handleGetProfile, handleUpdateProfile } from '../controller/index.js'

export const userRouter = express.Router()

userRouter.get("/getprofile", verifyToken, handleGetProfile)
userRouter.post("/createprofile", verifyToken, handleCreateProfile)
userRouter.patch("/updateprofile", verifyToken, handleUpdateProfile)
