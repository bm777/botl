import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, View } from 'react-native';
import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {
    ViewfinderCircleIcon as VCIS, 
    HomeIcon as HIS, 
    QrCodeIcon as QCIS,
    Cog6ToothIcon as C6IS
  } from "react-native-heroicons/solid"
import {
    ViewfinderCircleIcon as VCI, 
    HomeIcon as HI,
    QrCodeIcon as QCI,
    Cog6ToothIcon as C6I,
    ChevronLeftIcon as CLI,
  } from "react-native-heroicons/outline"


export default function App() {

  const [splahscreen, setSplahscreen] = useState(true);
  const [page, setPage] = useState("home") // home - scan - profile

  const [amount, setAmount] = useState("0") //
  const [currency, setCurrency] = useState("EUROe") //
  const [token, setToken] = useState("0x000000") //

 
  useEffect(() =>  {
    const interval = setInterval(() => {
      setSplahscreen(false)

    }, 1700); // 1700
    return () => clearInterval(interval);
  }, []);

  // handlers
  const handleHome = () => { setPage("home")}
  const handleQr = () => { setPage("qr")}
  const handleSettings = () => { setPage("settings")}
  const handleCurrency = (cur) => { setCurrency(cur)}
  const handleAmount = (value) => { setAmount(value)}
  const showQr = () => {

  } 



  return (
    <View className="flex-1 items-center justify-center bg-[#2F1F68]">
      {
        splahscreen ?
        <View className="flex-1 items-center justify-center w-full">
          <View className="border-[1px] border-[#08F376] bg-[#1A2A56] border-dashed shadow-2xl rounded-xl px-16 py-5">
            <Text className=" font-medium text-6xl text-white animate-bounce">botl</Text>
          </View>
          
          <Text className="font-light text-xl text-center text-[#8A9CCE] mt-10 px-5">Clean your house for free and get rewarded</Text>
          <StatusBar style="auto" />
        </View>
        :
        <View className="w-full h-full bg-[#2F1F68] relative">
          {/* top+body */}
          <View className="w-full h-[81%] mt-10  overflow-auto relative">
            <View className="flex flex-row items-center mx-[5%] mt-3">
              {/* <CLI color={"#fff"} size={30} /> */}
              <Text className="text-white text-3xl font-semibold">Payment</Text>
            </View>
            {/* --------- amount --------- */}
            <View className="rounded-md flex flex-col mx-[5%] mt-10">
              <Text className="text-sm text-[#afb9e1] font-semibold">Equivalent amount of the transaction</Text>
            </View>
            <View className="border border-[#289BE3] overflow-hidden rounded-md flex flex-col mx-[5%] mt-2 bg-[#28146B]">
              <Text className="text-[#6F7CAA] text-xm font-semibold ml-2 mt-1">Payment</Text>
              <View className="">
                <TextInput className="text-[#289BE3] bg-[#28146B] text-2xl font-semibold text-center mb-2" 
                          keyboardType="numeric" 
                          returnKeyType='done'
                          onChangeText={val => handleAmount(val)}
                          maxLength={3}>
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
                      { label: 'SOL', value: 'sol' },
                      { label: 'EUROe', value: 'euroe' },
                      { label: 'BONK', value: 'bonk' },
                      { label: 'USDC', value: 'usdc' },
                    ]}
                    value={currency}
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


            {/* --------- button --------- */}
            <View className=" absolute bottom-5 rounded-md flex w-full h-[8%]">
              <View className="bg-[#7C5EF2] w-[95%] h-full mx-auto overflow-hidden rounded-md flex flex-row items-center justify-center"> 
                <Text className="text-[#fff] text-lg font-semibold">Request payment</Text>
              </View>
            </View>
          </View>

          {/* bottom */}
          <View className="w-[100%] h-[10%] flex absolute bottom-10">
            <View className="w-[95%] h-[100%] bg-[#3B2A7A] mx-auto rounded-2xl shadow-xl flex flex-row justify-center ">
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

