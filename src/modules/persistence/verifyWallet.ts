import api from 'request';
import auth from '../../config/auth';
import { Request, Response } from 'express';
import balanceBnbURL from '../../config/blockchain/url/balanceBNB';

const verifyWallet = async(req:Request, res:Response) => {
    const { wallet_address } = req.body;
    
    const urlDetailsTransaction = balanceBnbURL(wallet_address.toLowerCase(), auth.binance_api_key);

    api.get(urlDetailsTransaction, (error, response, body) => {
        if(JSON.parse(body).message === 'NOTOK') { 
            return res.status(400).json({message:'Invalid'}); 
        }
        return res.status(200).json({message:'ok'}); 
    });
}

export default verifyWallet;