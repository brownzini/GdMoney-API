import { sign } from "jsonwebtoken"
import generateRefreshToken from "./generateRefreshToken";
import auth from "../config/auth"
import { updateUser } from "firebase/services/User";

const generateToken = async(id: string, type?: string):Promise<string> => {
    const token = sign({}, auth.secret_token, {
        subject: id,
        expiresIn: "600s"
    });

    if (type === 'initial') {
        const id_refresh_token = await generateRefreshToken(id);
        const data = {
            islogged: true,
            refresh_token: id_refresh_token,
            id: id
        }
        updateUser(data);
    }
    
    return  token; 
}

export default generateToken;