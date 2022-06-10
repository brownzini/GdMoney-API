const detailsTransaction = (address: string, apiKey:string):string => {
    return `https://api.bscscan.com/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&&offset=10&sort=desc&apikey=${apiKey}`
}

export default detailsTransaction;
