import auth  from '../../../config/auth';
import { Request, Response } from 'express';
import { getUserProfile } from '../../../firebase/services/Users';
import balanceBNB from '../../../config/blockchain/consumeApi/balanceBNB';
import { verify } from 'jsonwebtoken';

const getBnbBalanceUserController = async(req:Request, res:Response): Promise<Response> => {
    try { 
        const authToken = req.headers.authorization

        if (!authToken) {
            return res.status(401).json({
                message: "Token is missing"
            })
        }
    
        const [, token] = authToken.split(" ");

        const { sub: user_id } = verify(token, auth.secret_token);
        const user = await getUserProfile(user_id+'');

        if(user === undefined) {
            return res.status(400).json({
                message: 'User not found'
            });
        }

        await balanceBNB(
            req, res, 
            user.wallet_address, 
            auth.binance_api_key
        );
    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}

export default getBnbBalanceUserController;