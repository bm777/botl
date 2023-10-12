import { PublicKey, Connection} from "@solana/web3.js"

const QUICKNODE_API_URL = 'https://red-purple-dinghy.solana-mainnet.quiknode.pro/babef24184b966b408b364d43e35800caca94f47/';



export async function getTransactions(SOLANA_ADDRESS) {

    const url = `${QUICKNODE_API_URL}/getTransactionHistory/${SOLANA_ADDRESS}`;
    console.log("url", url)

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Network response was not ok ${response.statusText}`);
        }

        const data = await response.json();

        console.log(data);
        return data
    } catch (error) {
        console.error('Failed to fetch transaction history:', error);
    }
}

