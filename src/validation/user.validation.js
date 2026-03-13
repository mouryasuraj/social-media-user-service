import { allowedUserFields, reqBodyNotPresentTxt } from "../config/index.js"
import { AppError } from "../utils/index.js"
import validator from 'validator'


export const validateCreateUserReqBody = (req) =>{
    if(!req.body || Object.keys(req?.body || {}).length===0) throw new AppError(reqBodyNotPresentTxt, 400)

    const reqBody = req.body
    const reqBodyFields = Object.keys(reqBody)

    const extraFields = reqBodyFields.filter(d => !allowedUserFields.includes(d))
    if(extraFields.length!==0) {
        const errMsg = `fields are not allowed: [${extraFields.join(", ")}]`
        throw new AppError(errMsg, 400)
    }

    const missingFields = allowedUserFields.every(d => reqBodyFields.includes(d))
    if(!missingFields){
        const errMsg = `one of the fields are missing: [${allowedUserFields.join(", ")}]`
        throw new AppError(errMsg, 400)
    }

    const {fullName, skills, about, photoUrl} = reqBody
    const age = Number(reqBody?.age || 0)

    const createUserFieldValidation = [
        { valid: fullName==="", message:"Fullname is required" },
        { valid: fullName && fullName.trim().length>100, message:"Fullname should not exceed more than 100 character" },
        { valid: age && (age<12 || age>100), message:"Age should be greater than 12 or less than 100" },
        { valid: skills && skills.length>60, message:"Skill limit exceeded more than 60" },
        { valid: about && about.trim().length>200, message:"About should be less than 200" },
        { valid: photoUrl && validator.isURL(photoUrl) , message:"URL is not valid" },
    ]
    

    for (const check of createUserFieldValidation){
        if(check.valid){
            throw new AppError(check.message, 400)
        }
    }

    reqBody.fullName = fullName.trim()
    reqBody.about = about.trim()
    reqBody.photoUrl = photoUrl.trim()

    return reqBody

}

// validateUpdateUserReqBody
export const validateUpdateUserReqBody = (req) =>{
    if(!req.body || Object.keys(req?.body || {}).length===0) throw new AppError(reqBodyNotPresentTxt, 400)

    const reqBody = req.body
    const reqBodyFields = Object.keys(reqBody)

    const extraFields = reqBodyFields.filter(d => !allowedUserFields.includes(d))
    if(extraFields.length>0) throw new AppError(`Extra fields are not allowed: [${extraFields.join(", ")}]`)

    const {fullName, skills, about, photoUrl} = reqBody
    const age = Number(reqBody?.age || 0)

    const updateUserFieldValidation = [
        { valid: fullName && fullName.trim().length>100, message:"Fullname should not exceed more than 100 character" },
        { valid: age && (age<12 || age>100), message:"Age should be greater than 12 or less than 100" },
        { valid: skills && skills.length>60, message:"Skill limit exceeded more than 60" },
        { valid: about && about.trim().length>200, message:"About should be less than 200" },
        { valid: photoUrl && validator.isURL(photoUrl) , message:"URL is not valid" },
    ]
    
    for (const check of updateUserFieldValidation){
        if(check.valid){
            throw new AppError(check.message, 400)
        }
    }

    reqBody.fullName = fullName?.trim()
    reqBody.about = about?.trim()
    reqBody.photoUrl = photoUrl?.trim()

    return reqBody
}