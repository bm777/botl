
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
    const tx = []
    for(let i=0; i<result.length; i++){
        const infos = result[i]["actions"][0]["info"]
        if(infos["amount"] !== undefined){
            const amount = infos["amount"]
            const sender = infos["sender"]
            tx.push({sender: sender, amount: amount})
        }else console.log("===============> No usefull information found")
    }
    return tx

}

export const getSolBalance = async (adr) => {
    const response = await fetch("https://api.shyft.to/sol/v1/wallet/balance?network=mainnet-beta&wallet="+adr+"&tx_num=7", requestOptions)
    const data = await response.json()
    return data.result.balance
}

export const getBalance = async (adr) => {
    const response = await fetch("https://api.shyft.to/sol/v1/wallet/all_tokens?network=mainnet-beta&wallet="+adr, requestOptions)
    const data = await response.json()
    let balance = 0
    for(let i=0; i<data.result.length; i++){
        // console.log("Token: -> ",data.result[i].info.symbol)

        if(data.result[i].info.symbol === "EUROe") balance += data.result[i].balance * 1.05
        if(data.result[i].info.symbol === "Bonk") balance += data.result[i].balance * 0.00000018
        if(data.result[i].info.symbol === "USDC") balance += data.result[i].balance * 1
        if(data.result[i].info.symbol === "USDT") balance += data.result[i].balance * 1
    }

    return balance + await getSolBalance(adr)

}
