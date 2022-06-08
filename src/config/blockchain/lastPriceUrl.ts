const lastPriceUrl = (apiKey:string):string => {
     return `https://api.bscscan.com/api?module=stats&action=bnbprice&apikey=${apiKey}`;
}

export default lastPriceUrl;