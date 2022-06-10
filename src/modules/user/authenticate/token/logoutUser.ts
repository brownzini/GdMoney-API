import { verify } from "jsonwebtoken";
import { Request, Response } from "express";
import auth from "../../../../config/auth"; 
import { getUserProfile, updateUser } from "../../../../firebase/services/Users";
import { deleteRT } from "../../../../firebase/services/Authenticate";


export default async function logoutUser(request: Request, response: Response) {
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
        const data = user;
        deleteRT(user.refresh_token);
        Object.assign(data, {
            id: user_id,
            islogged: false,
            refresh_token: ""
         });
        updateUser(data);
        return response.status(200).json('Updated');
    } catch(err) {
        return response.status(401).json({
            message: "Token is invalid or expired"
        })
    }
}