import { profileCreated, profileUpdated } from "../config/index.js"
import { User } from "../model/user.model.js"
import { handleSendResponse, consoleError, handleError, AppError } from "../utils/index.js"
import { validateCreateUserReqBody } from "../validation/user.validation.js"

// handleCreateProfile
export const handleCreateProfile = async (req,res) =>{
    try {
        const reqbody = validateCreateUserReqBody(req)

        handleSendResponse(res, 201,true,profileCreated,{})
        
    } catch (error) {
        consoleError(error)
        const statusCode = error?.statusCode || 500
        handleError(res, statusCode, error?.message)
    }
}


// handleUpdateProfile
export const handleUpdateProfile = async (req,res) =>{
    try {


        handleSendResponse(res, 201,true,profileUpdated,{})
        
    } catch (error) {
        consoleError(error)
        const statusCode = error?.statusCode || 500
        handleError(res, statusCode, error?.message)
    }
}


// handleGetProfile
export const handleGetProfile = async (req,res)=>{
    try {
        const {userId} = req?.query
        console.log(userId)

        const profile = await User.findOne({userId})
        if(!profile) throw new AppError("user not found", 404)

        handleSendResponse(res, 200, true, "success",userId)
    } catch (error) {
        consoleError(error)
        const status = error.statusCode || 500;
        handleError(res, status, error?.message);
    }
}