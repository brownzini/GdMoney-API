import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import auth from "../../../config/auth";
import { getUserProfile } from "../../../firebase/services/Users";

export async function getUserID(request: Request, response: Response) {
    const authToken = request.headers.authorization

    if (!authToken) {
        return response.status(401).json({
            message: "Token is missing"
        })
    }

    const [, token] = authToken.split(" ");

    try {
        const { sub: user_id } = verify(token, auth.secret_token);
        return response.status(200).json({user_id: user_id});
    } catch(err) {
        return response.status(401).json({
            message: "Token is invalid or expired"
        })
    }  
}

