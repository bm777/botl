var myHeader = new Headers();
myHeader.append("x-api-key", "g0ubPHNPikIBVNuo");
var requestOptions = {
    method: 'GET',
    headers: myHeader,
    redirect: 'follow'
};

export const getTransactions = async (adr) => {
    const response = await fetch("https://api.shyft.to/sol/v1/wallet/transaction_history?network=mainnet-beta&wallet="+adr, requestOptions)
    const data = await response.json()
    const result = data.result
    for(let i=0; i<result.length; i++){
        console.log("===============>",result[i]["actions"])
    }

    return data

}
export const getBalance = async (adr) => {
    const response = await fetch("https://api.shyft.to/sol/v1/wallet/balance?network=mainnet-beta&wallet="+adr+"&tx_num=7", requestOptions)
    const data = await response.json()
    return data.result.balance
}