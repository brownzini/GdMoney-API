import auth  from '../../../config/auth';
import { Request, Response } from 'express';
import { getUserProfile } from '../../../firebase/services/Users';
import balanceBNB from '../../../config/blockchain/consumeApi/balanceBNB';

const getBnbBalanceUserController = async(req:Request, res:Response): Promise<Response> => {
    try { 
        const { id } = req.params;

        const user = await getUserProfile(id);

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