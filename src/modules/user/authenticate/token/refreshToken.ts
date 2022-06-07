import dayjs from 'dayjs';
import { Request, Response } from 'express';
import { getRefreshToken, updateRefreshToken } from "firebase/services/Authenticate"
import generateToken from "provider/generateToken"

const refreshToken = async(req:Request, res:Response): Promise<Response> => {
    const { id_refresh_token } = req.body;
    const rt = await getRefreshToken(id_refresh_token);

    if (rt === null) {
        return res.status(401).json({
            message: "Invalid token"
        });
    } 

    const token = await generateToken(rt.user_id);
    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(rt.expiresIn));

    if (refreshTokenExpired) {
        const expiresIn = dayjs().add(3, "minutes").unix();
        updateRefreshToken(expiresIn, id_refresh_token);
    }

    return res.status(200).json({token: token, rt});
}

export default refreshToken;