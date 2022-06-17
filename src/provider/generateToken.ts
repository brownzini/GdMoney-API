import { sign } from "jsonwebtoken"
import generateRefreshToken from "./generateRefreshToken";
import auth from "../config/auth"
import { updateUser } from "../firebase/services/Users";

type Props = {
    token: string;
    id_refresh_token: string;
}

const generateToken = async(id: string, type?: string):Promise<Props> => {
    const token = sign({}, auth.secret_token, {
        subject: id,
        expiresIn: "6000s"
    });
    let id_rt = '';

    if (type === 'initial') {
        const id_refresh_token = await generateRefreshToken(id);
        const data = {
            islogged: true,
            refresh_token: id_refresh_token,
            id: id
        }
        updateUser(data);
        id_rt = id_refresh_token;
    }
    
    return {
        token: token, 
        id_refresh_token: id_rt
    }; 
}

export default generateToken;