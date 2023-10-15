import { Cluster } from '@solana/web3.js';
import { clusterApiUrl, Connection } from '@solana/web3.js';

var myHeader = new Headers();
myHeader.append("x-api-key", "g0ubPHNPikIBVNuo");
var requestOptions = {
    method: 'GET',
    headers: myHeader,
    redirect: 'follow'
};

const splTokens = {
    "2VhjJ9WxaGC3EZFwJG9BDUs9KxKCAjQY4vgd1qxgYWVg": "EUROe",
    "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263": "BONK",
    "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v": "USDC",
  }

export const getTransactions = async (adr) => {
    const response = await fetch("https://api.shyft.to/sol/v1/wallet/transaction_history?network=mainnet-beta&wallet="+adr, requestOptions)
    const data = await response.json()
    const result = data.result
    const tx = []

    for(let i=0; i<result.length; i++){
        const infos = result[i]["actions"][0]["info"]
        const source_protocol = result[i]["actions"]
        
        if(infos["amount"] !== undefined){
            const amount = infos["amount"]
            const sender = infos["sender"]
            const timestamp = result[i]["timestamp"]
            const token = infos["token_address"]
            tx.push({sender: sender, amount: amount, timestamp: timestamp, token: splTokens[token]})
            // console.log("Info: -> ",infos)
            //   console.log("===============> source_protocol: -> ",token, )
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


export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  export function findRef(ref) {
    const endpoint = clusterApiUrl(cluster);
    const connection = new Connection(endpoint, 'confirmed');

    return ""
  }
  export async function establishConnection(cluster = 'devnet') {
    const endpoint = clusterApiUrl(cluster);
    const connection = new Connection(endpoint, 'confirmed');
    const version = await connection.getVersion();
    console.log('Connection to cluster established:', endpoint, version);

    return connection;
}