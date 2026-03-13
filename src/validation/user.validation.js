import { allowedUserFields, reqBodyNotPresentTxt } from "../config/index.js"
import { AppError } from "../utils/index.js"


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
        { valid: fullName && fullName.length>100, message:"Fullname should not exceed more than 100 character" },
        { valid: age && (age<12 || age>100), message:"Fullname should not exceed more than 100 character" },
    ]






    return

}