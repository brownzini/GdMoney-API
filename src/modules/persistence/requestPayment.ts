import api from 'request';
import dayjs from 'dayjs';
import auth from '../../config/auth';
import { Request, Response } from 'express';
import detailsTransaction from '../../config/blockchain/url/detailsTransaction';

const requestPayment = async(req:Request, res:Response) => {
    const fraction = 1000000000000000000;
    
    const { from, price } = req.body;

    const urlDetailsTransaction = detailsTransaction(auth.wallet_address_api.toLowerCase(), auth.binance_api_key)

    api.get(urlDetailsTransaction, (error, response, body) => {
        if(error) { 
            return res.status(400).json('Error in request'); 
        }

        const data = JSON.parse(body).result;
        const currentData = dayjs().add(0, "minutes").unix();

        const result = data.find(par => (currentData >= par.timeStamp && par.from === from));

        if (result === undefined) {
            return res.status(400).json('No transaction found');  
        }

        if (Number(result.value)/fraction !== price) {
            return res.status(400).json('Invalid price');  
        }

        if (result.txreceipt_status === '0') {
            return res.status(400).json('Fail transaction');    
        }

        if (result.txreceipt_status === '1') {
            return res.status(200).json({
                message: JSON.parse(body).message
            });
        }

        return res.status(400).json('Pending transaction'); 
    });
}

export default requestPayment;