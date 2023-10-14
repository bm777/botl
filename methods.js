var myHeader = new Headers();
myHeader.append("x-api-key", "g0ubPHNPikIBVNuo");

export const getTransactions = async (adr) => {
    var requestOptions = {
        method: 'GET',
        headers: myHeader,
        redirect: 'follow'
    };
    console.log(requestOptions)
    const response = await fetch("https://api.shyft.to/sol/v1/wallet/balance?network=devnet&wallet="+adr, requestOptions)
    const data = await response.json()
    console.log("data", data)
    // console.log("response", response.json())
    // .then(response => response.text())
    // .then(result => console.log(result))

}