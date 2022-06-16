import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import auth from "../../../config/auth";
import { getUserProfile } from "../../../firebase/services/Users";
import { getRefreshToken, updateRefreshToken } from "../../../firebase/services/Authenticate";
import generateToken from "../../../provider/generateToken";
import dayjs from "dayjs";

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization

    if (!authToken) {
        return response.status(401).json({
            message: "Token is missing"
        })
    }

    const [, token] = authToken.split(" ");

    try {
        const { sub: user_id } = verify(token, auth.secret_token);
        const user = await getUserProfile(user_id+'');

        const id_refresh_token = user.refresh_token;
        const rt = await getRefreshToken(id_refresh_token);
    
        if (rt === null) {
            return response.status(401).json({
                message: "Invalid token"
            });
        } 
    
        await generateToken(rt.user_id);
        const refreshTokenExpired = dayjs().isAfter(dayjs.unix(rt.expiresIn));
    
        if (refreshTokenExpired) {
            const expiresIn = dayjs().add(30, "minutes").unix();
            updateRefreshToken(expiresIn, id_refresh_token);
        }

        if( user.islogged ) {
            next();
        } else {
           return response.status(401).json({
              message: "You aren't logged"
           })
        }
    } catch(err) {
        return response.status(401).json({
            message: "Token is invalid or expired"
        })
    }  
}

