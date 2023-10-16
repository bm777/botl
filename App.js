import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';

import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, View } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { SafeAreaView, ScrollView } from 'react-native';

import {
    ViewfinderCircleIcon as VCIS,
    HomeIcon as HIS, 
    QrCodeIcon as QCIS,
    Cog6ToothIcon as C6IS,
    CheckCircleIcon as CCI,
  } from "react-native-heroicons/solid"
import {
    ViewfinderCircleIcon as VCI, 
    ArrowDownLeftIcon as ADLI,
    HomeIcon as HI,
    QrCodeIcon as QCI,
    Cog6ToothIcon as C6I,
    ChevronLeftIcon as CLI,
  } from "react-native-heroicons/outline"

import BigNumber from 'bignumber.js';
import {
  PublicKey,
  Keypair,
  Connection,
} from '@solana/web3.js';
import {
  FindReferenceError,
  findReference,
  encodeURL,
} from '@solana/pay';
import CreateQR from './screens/createQr';
import Tx from './screens/tx';
import { getBalance, getTransactions, sleep, establishConnection
} from './methods';



export default function App() {
  // view states
  const [splahscreen, setSplahscreen] = useState(true);
  const [page, setPage] = useState("home") // home - scan - profile
  const [requested, setRequested] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState("pending") //pending - success - error
  const splTokens = {
      "EUROe": new PublicKey("2VhjJ9WxaGC3EZFwJG9BDUs9KxKCAjQY4vgd1qxgYWVg"),
      "BONK": new PublicKey("DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263"),
      "USDC": new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"),
      "SOL": "---"
    }
  // home states
  const [transactions, setTransactions] = useState([])
  // qr states
  const [url, setUrl] = useState("")
  const [showQr, setSowhQr] = useState(false)
  const [amount, setAmount] = useState("0.1") //
  const [balance, setBalance] = useState("") //
  const [currency, setCurrency] = useState(defaultCurrency)
  const [reference, setReference] = useState("")
  
  const connection = new Connection('http://rpc.solscan.com');
  // settings states
  const [defaultCurrency, setDefaultCurrency] = useState("EUROe") 
  const [solanaAdr, setSolanaAdr] = useState("BF4N3pDDpmX5FyHqGnanaNBnw4iMNtLCD2trUsaG2tRC") // solana address

 //useeffect
  useEffect(() =>  {
    getBalance(solanaAdr).then((res) => {
      sleep(1500)
      setBalance(res)
    } )
    const loadTx = async () => {
      const txs = await getTransactions(solanaAdr)
      setTransactions(txs)
    }
    sleep(1500)
    loadTx()

    const interval = setInterval(() => {
      setSplahscreen(false)
      // getBalance(solanaAdr).then((res) => {
      //   setBalance(res)
      // } )

    }, 1700); // 1700
    return () => clearInterval(interval);
    
    

  }, []);

  // handlers
  const handleHome = async () => { 
    setPage("home"); 
    getBalance(solanaAdr).then((res) => {
      setBalance(res)
    })
    const txs = await getTransactions(solanaAdr)
    console.log(txs)
    // ------------
    setTransactions(txs)
    // ------------
 }
  const handleQr = () => { setPage("qr")}
  const handleSettings = () => { setPage("settings")}
  const handleCurrency = (cur) => { setCurrency(cur)}
  const handleDefaultCurrency = (cur) => { setDefaultCurrency(cur)}
  const handleDefaultSolana = (adr) => { setSolanaAdr(adr)}
  const handleSolana = (cur) => { setSolanaAdr(cur)}
  const handleAmount = (value) => { setAmount(value)}
  const generateQr = () => {
    const payment_recipient = new PublicKey(solanaAdr); // -> to change with euroe or bonk currency
    const payment_amount = new BigNumber(amount)
    const payment_reference = new Keypair().publicKey;
    setReference(payment_reference)
    const payment_label = "Botl LLP";
    const payment_message = "Botl transaction";
    let r = (Math.random() + 1).toString(36).substring(7);
    const payment_memo = '#' + r;

  const _url = () => {
    if(currency === "SOL") {
      return encodeURL({
        recipient: payment_recipient,
        amount: payment_amount,
        reference: payment_reference,
        label: payment_label,
        message: payment_message,
        // memo: payment_memo,
      });
    } else {
      return encodeURL({
        recipient: payment_recipient,
        amount: payment_amount,
        reference: payment_reference,
        splToken: splTokens[currency],
        label: payment_label,
        message: payment_message,
        // memo: payment_memo,
      });
    }
  }
  setRequested(true)
  setSowhQr(true)
  setUrl(_url())

  // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  // setInterval() 

  //Find the transaction in the blockchain


  }
  

  return (
    <View className="flex-1 items-center justify-center bg-[#2F1F68]">
      {
        splahscreen ?
        <View className="flex-1 items-center justify-center w-full">
          <View className="border-[1px] border-[#08F376] bg-[#1A2A56] border-dashed shadow-2xl rounded-xl px-16 py-5">
            <Text className=" font-medium text-6xl text-white animate-bounce">botl</Text>
          </View>
          
          <Text className="font-light text-xl text-center text-[#8A9CCE] mt-10 px-5">Your instant payment</Text>
          <StatusBar style="auto" />
        </View>
        :
        <View className="w-full h-full bg-[#2F1F68] relative">
          {/* top+body */}
          {/* ------ HOME ------ */}
          {
            page === "home" ?
            <View className="w-full h-[81%] mt-10 relative ">
              <View className="flex flex-row items-center mx-[5%] mt-3">
                <Text className="text-white text-3xl font-semibold">BOTL</Text>
              </View>
              <SafeAreaView className="flex flex-1">
                <ScrollView contentInsetAdjustmentBehavior='automatic'>
                  <View className="flex flex-1 flex-col justify-center ">
                    {/* 3B2A7A */}
                    <View className=" w-[90%] mt-10 mx-auto bg-[#7c5ef3] rounded-xl">
                      <Text className="text-[#8C9FD0] text-2xl font-base ml-5 mt-6">My balance</Text>
                      <Text className="text-white text-5xl font-semibold ml-5 mt-4">€ {balance.toString().slice(0, 8)} </Text>
                      <View className="flex flex-row justify-end mt-5 mb-5">
                        <View className="rounded-full bg-[#3B2A7A] mr-5">
                          <Text className="text-white text-lg font-semibold mx-5 my-1">Estimated total of all token</Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  {/* transactions */}
                  <View className="flex flex-row items-center mx-[5%] mt-10">
                    <Text className="text-[#8C9FD0] text-2xl font-medium">Transactions</Text>
                  </View>
                  
                  {/* tx */}
                  {
                    transactions.length !== undefined ?
                      <>
                      {
                        transactions.map((tx, id) => {
                          return <Tx key={id} adress={tx.sender} amount={tx.amount} date={tx.timestamp} currency={tx.token} />
                        })
                      }
                      </>
                      :
                      <View className="mx-[5%] mt-3">
                        <Text className=" text-[#8C9FD0] mt-1">No transaction or Loading</Text>
                      </View>

                  }
                </ScrollView>
              </SafeAreaView>
            </View>
            :
            null
          }
          {/* ------ PAYMENT ------ */}
          {
            page === "qr" ?
            <View className="w-full h-[81%] mt-10  overflow-auto relative">
              <View className="flex flex-row items-center mx-[5%] mt-3">
                {/* <CLI color={"#fff"} size={30} /> */}
                <Text className="text-white text-3xl font-semibold">Payment</Text>
              </View>
              {/* --------- amount --------- */}
              <SafeAreaView className=" flex-1 ">
                <ScrollView >
                  <View className="rounded-md flex flex-col mx-[5%] mt-3">
                    <Text className="text-sm text-[#afb9e1] font-semibold">Equivalent amount of the transaction</Text>
                  </View>
                  <View className="border border-[#289BE3] overflow-hidden rounded-md flex flex-col mx-[5%] mt-2 bg-[#28146B]">
                    <Text className="text-[#6F7CAA] text-xm font-semibold ml-2 mt-1">Payment</Text>
                    <View className="">
                      <TextInput className="text-[#289BE3] bg-[#28146B] text-2xl font-semibold text-center mb-2" 
                                keyboardType="decimal-pad" 
                                returnKeyType='done'
                                defaultValue='0.1'
                                autoCapitalize="words"
                                onChangeText={val => handleAmount(val)}
                                maxLength={7}>
                      </TextInput>
                    </View>
                  </View>

                  {/* --------- currency --------- */}
                  <View className="rounded-md flex flex-col mx-[5%] mt-4">
                    <Text className="text-sm text-[#afb9e1] font-semibold">The currency</Text>
                  </View>
                  <View className="border border-[#EE9F21] overflow-hidden rounded-md flex flex-col mx-[5%] mt-2 bg-[#28146B]">
                    <Text className="text-[#6F7CAA] text-xm font-semibold ml-2 mt-1">Currency</Text>
                    <View className=" text-4xl">
                      <RNPickerSelect
                          onValueChange={value =>handleCurrency(value)}
                          items={[
                            { label: 'SOL', value: 'SOL' },
                            { label: 'EUROe', value: 'EUROe' },
                            { label: 'BONK', value: 'BONK' },
                            { label: 'USDC', value: 'USDC' },
                          ]}
                          value={currency}
                          defaultValue="EUROe"
                          style={{
                            inputIOS: {
                              fontSize: 24,
                              paddingVertical: 5,
                              paddingHorizontal: 5,
                              borderRadius: 4,
                              textAlign: "center",
                              color: '#EE9F21',
                              paddingRight: 30, // to ensure the text is not cut off in iOS
                            },
                            inputWeb: {
                              fontSize: 24,
                            }
                          }}
                        />
                    </View>
                  </View>

                  {/* --------- qrcode --------- */}
                  <View className="rounded-md flex flex-col mx-[5%] mt-4">
                    <Text className="text-sm text-[#afb9e1] font-semibold">QR Code</Text>
                  </View>
                  <View className="rounded-md bg-[#28146B] flex flex-row justify-center mx-[5%] py-3 mt-2 border border-[#7C5EF2]">
                    {
                      showQr ?
                      <CreateQR size={220} url={url}  />
                      : <View className="h-[220px]"></View>
                    }
                  </View>

                  {/*------------- status -------------- */}
                  {/* {
                    requested ?
                    <View className={"border overflow-hidden rounded-md flex flex-col mx-[5%] mt-2 py-3 bg-[#28146B] "+(paymentStatus !== "success"? "border-[#7C5EF2]" : "border-[#21BF75]")}>
                      <View className="">
                        <Text className="text-[#7C5EF2] bg-[#28146B] text-2xl font-semibold text-center">{paymentStatus === "pending" ? "Pending...": "Succesfull!"}</Text>
                      </View>
                    </View> : null
                  } */}
                </ScrollView>
              </SafeAreaView>

              


              {/* --------- button --------- */}
              <View className=" absolute bottom-5 rounded-md flex w-full h-[8%]">
                <TouchableOpacity onPress={generateQr}>
                  <View className="bg-[#7C5EF2] w-[95%] h-full mx-auto overflow-hidden rounded-md flex flex-row items-center justify-center"> 
                    <Text className="text-[#fff] text-lg font-semibold">Request payment</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            :
            null
          }





          {/* ------ SETTINGS ------ */}
          {
            page === "settings" ?
            <View className="w-full h-[81%] mt-10 relative">
              <View className="flex flex-row items-center mx-[5%] mt-3">
                <Text className="text-white text-3xl font-semibold">Settings</Text>
              </View>

              {/* --------- currency --------- */}
              <View className="rounded-md flex flex-col mx-[5%] mt-4">
                <Text className="text-sm text-[#afb9e1] font-semibold">Default currency</Text>
              </View>
              <View className="border border-[#EE9F21] overflow-hidden rounded-md flex flex-col mx-[5%] mt-2 bg-[#28146B]">
                <Text className="text-[#6F7CAA] text-xm font-semibold ml-2 mt-1">Currency</Text>
                <View className=" text-4xl">
                  <RNPickerSelect
                      onValueChange={value =>handleDefaultCurrency(value)}
                      items={[
                        { label: 'SOL', value: 'SOL' },
                        { label: 'EUROe', value: 'EUROe' },
                        { label: 'BONK', value: 'BONK' },
                        { label: 'USDC', value: 'USDC' },
                      ]}
                      value={defaultCurrency}
                      defaultValue="euroe"
                      style={{
                        inputIOS: {
                          fontSize: 24,
                          paddingVertical: 5,
                          paddingHorizontal: 5,
                          borderRadius: 4,
                          textAlign: "center",
                          color: '#EE9F21',
                          paddingRight: 30, // to ensure the text is not cut off in iOS
                        },
                        inputWeb: {
                          fontSize: 24,
                        }
                      }}
                    />
                </View>
              </View>

              {/* --------- solana address --------- */}
              <View className="rounded-md flex flex-col mx-[5%] mt-7">
                <Text className="text-sm text-[#afb9e1] font-semibold">Solana's adress</Text>
              </View>
              <View className="border border-[#289BE3] overflow-hidden rounded-md flex flex-col mx-[5%] mt-2 bg-[#28146B]">
                <Text className="text-[#6F7CAA] text-xm font-semibold ml-2 mt-1">SOLANA</Text>
                <View className="mx-2">
                  <TextInput className="text-[#289BE3] bg-[#28146B] text-2xl font-semibold text-center mb-2" 
                            keyboardType="default" 
                            returnKeyType='done'
                            defaultValue=''
                            onChangeText={val => handleDefaultSolana(val)}
                            >
                  </TextInput>
                </View>
              </View>

            </View>
            :
            null
          }

          {/* bottom */}
          <View className="w-[100%] h-[10%] flex absolute bottom-10">
            <View className="w-[95%] h-[100%] bg-[#3B2A7A] mx-auto rounded-2xl flex flex-row justify-center ">
              {
                page === "home" ?
                  <View className="flex flex-row mx-[10%] items-center">
                    <TouchableOpacity >
                      <View className="flex items-center">
                        <HIS color={"#fff"} size={42}/>
                        <View className="w-[10px] h-1 bg-white rounded-full mt-1 -mb-2">
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                  :
                  <View className="flex flex-row mx-[10%] items-center">
                    <TouchableOpacity onPress={handleHome}>
                      <View className="flex items-center">
                        <HI color={"#8C9FD0"} size={42}/>
                      </View>
                    </TouchableOpacity>
                  </View>
              }
              {
                page === "qr" ?
                  <View className="flex flex-row mx-[10%] items-center">
                    <TouchableOpacity>
                      <View className="flex items-center">
                        <QCIS color={"#fff"} size={42}/>
                        <View className="w-[10px] h-1 bg-white rounded-full mt-1 -mb-2">
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                  :
                  <View className="flex flex-row mx-[10%] items-center">
                    <TouchableOpacity onPress={handleQr}>
                      <View className="flex items-center">
                        <QCI color={"#8C9FD0"} size={42}/>
                      </View>
                    </TouchableOpacity>
                  </View>
              }
              {
                page === "settings" ?
                  <View className="flex flex-row mx-[10%] items-center">
                    <TouchableOpacity>
                      <View className="flex items-center">
                        <C6IS color={"#fff"} size={42}/>
                        <View className="w-[10px] h-1 bg-white rounded-full mt-1 -mb-2">
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                  :
                  <View className="flex flex-row mx-[10%] items-center">
                    <TouchableOpacity onPress={handleSettings}>
                      <View className="flex items-center">
                        <C6I color={"#8C9FD0"} size={42}/>
                      </View>
                    </TouchableOpacity>
                  </View>
              }
            </View>
          </View>
        </View>
      }
      

      
    </View>
   
  );
}
