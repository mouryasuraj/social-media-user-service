import { somethingWentWrongTxt } from "../config/index.js"

const handleError = (res, status, msg) =>{
    if(res){
        res.status(status).json({message:msg || somethingWentWrongTxt, status:false})
    }
}

export {handleError}