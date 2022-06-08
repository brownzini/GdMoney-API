
const balanceUrl = (address: string, apiKey:string):string => {
    return `https://api.bscscan.com/api?module=account&action=balance&address=${address}&apikey=${apiKey}`
}

export default balanceUrl;