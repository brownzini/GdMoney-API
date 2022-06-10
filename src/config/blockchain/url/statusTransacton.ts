const statusTransaction = (hashAdress:string, apiKey:string):string => {
    return `https://api.bscscan.com/api?module=transaction&action=gettxreceiptstatus&txhash=${hashAdress}&apikey=${apiKey}`;
}

export default statusTransaction;