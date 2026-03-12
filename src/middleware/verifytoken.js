import jwt from 'jsonwebtoken'
import { env, publicKey, unauthorizedAccessTxt } from "../config/index.js"
import { AppError, consoleError, handleError } from "../utils/index.js";

export const verifyToken = (req, res, next) => {
    try {
        const {accessToken} = req.cookies;
        if(!accessToken) throw new AppError("Access token not found", 401)

        const decodedData = jwt.verify(accessToken, publicKey,{
            algorithms:"RS256",
            audience:env.AUDIENCE,
            issuer:env.ISSUER
        })
        if(!decodedData?.sub) throw new AppError("User id not found in token",401)

        req.user = decodedData

        next()
    } catch (error) {
        consoleError(error)
        handleError(res, 401, unauthorizedAccessTxt)
    }
}