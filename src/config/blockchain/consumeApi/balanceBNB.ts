import api from 'request';
import { Request, Response } from 'express';
import balanceBnbURL from "../url/balanceBNB";
import lastPriceUrl from '@config/blockchain/url/lastPrice';

const balanceBNB = async(
    req:Request, res:Response,
    wallet_address:string,
    apiToken: string
):Promise<Response>  => {
    const fraction = 1000000000000000000;

    const urlBalanceBNB = balanceBnbURL(wallet_address, apiToken);
    const urlLastPrice = lastPriceUrl(apiToken);

    const balance = [];

    api.get(urlLastPrice, (error, response, body) => {
        if(error) {
            return null;
        }
        const balanceBUSD = JSON.parse(body).result;
        balance.push(Number(balanceBUSD.ethusd))
    });

    setTimeout(() => {
        api.get(urlBalanceBNB, async(error, response, body) => {
            if(error) {
                return res.status(400).send();
            }
            const result = JSON.parse(body).result;
            const value = Number(result)/fraction;
            return res.status(200).json({
                balanceBNB: String(value),
                balanceBUSD: balance[0]
            });
        })
    }, 1500);

    return null;
}

export default balanceBNB;