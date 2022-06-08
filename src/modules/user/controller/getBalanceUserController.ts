import { Request, Response } from 'express';
import { getUserProfile } from '../../../firebase/services/Users';
import api from 'request';
import auth  from '../../../config/auth';
import balanceUrl from '../../../config/blockchain/balanceURL';

const getBalanceUserController = async(req:Request, res:Response): Promise<Response> => {
    const fraction = 1000000000000000000;
    try { 
        const { id } = req.params;

        const user = await getUserProfile(id);

        const urlBalance = balanceUrl(user.wallet_address, auth.binance_api_key);
     
        api.get(urlBalance, (error, response, body) => {
            if(error) {
                return console.dir(error);
            }
            const result = JSON.parse(body).result;
            const balance = Number(result)/fraction
            return res.status(200).json({
                balance: String(balance)
            });
        });
    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}

export default getBalanceUserController;