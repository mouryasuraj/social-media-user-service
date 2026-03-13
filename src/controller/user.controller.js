import { profileCreated, profileUpdated } from "../config/index.js"
import { User } from "../model/user.model.js"
import { handleSendResponse, consoleError, handleError, AppError } from "../utils/index.js"
import { validateCreateUserReqBody, validateUpdateUserReqBody } from "../validation/user.validation.js"

// handleCreateProfile
export const handleCreateProfile = async (req,res) =>{
    try {
        const reqbody = validateCreateUserReqBody(req)
        const loggedInUser = req.user

        // Check profile already created or not
        const existingProfile = await User.findOne({userId:loggedInUser.sub})
        if(existingProfile) throw new AppError("Profile has been already created", 409)

        // Create User Profile
        const newProfile = new User({...reqbody, userId:loggedInUser.sub})
        const createdUser = await newProfile.save()

        handleSendResponse(res, 201,true,profileCreated,createdUser)
        
    } catch (error) {
        consoleError(error)
        const statusCode = error?.statusCode || 500
        handleError(res, statusCode, error?.message)
    }
}


// handleUpdateProfile
export const handleUpdateProfile = async (req,res) =>{
    try {
        const reqBody = validateUpdateUserReqBody(req)
        const loggedInUser = req.user

        console.log(loggedInUser)

        // update profile
        const user = await User.findOneAndUpdate({userId:loggedInUser.sub},{$set:reqBody},{new:true})

        handleSendResponse(res, 201,true,profileUpdated,user)
        
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

        handleSendResponse(res, 200, true, "success",profile)
    } catch (error) {
        consoleError(error)
        const status = error.statusCode || 500;
        handleError(res, status, error?.message);
    }
}