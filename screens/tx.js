import {
    CheckCircleIcon as CCI,
  } from "react-native-heroicons/solid"
import {
    ArrowDownLeftIcon as ADLI,
  } from "react-native-heroicons/outline"
  import { Text, View } from 'react-native';
const Tx = (props) => {
    const {amount, adress, date, currency} = props

    return (
        <View className="flex flex-row justify-between items-center mx-[5%] mt-1 py-3 rounded-md bg-[#28146b00] border border-[#28146b00]">
            <View className="flex flex-row items-center">
                <View className="border border-white/30 rounded-full p-[6px] mr-2">
                    <ADLI color={"#ED991E"}></ADLI>
                    <View className="absolute -bottom-[3px] -right-[3px]">
                        <CCI color={"#7C5EF2"} size={16}></CCI>
                    </View>
                </View>
                <View className="">
                    <View className="">
                        <Text className=" text-sm font-semibold text-[#8C9FD0]">{adress.slice(0,15)} • • •</Text>
                    </View>
                    <View className="">
                        <Text className=" text-xs text-[#8C9FD0] mt-1">Received • {date}</Text>
                    </View>
                </View>
            </View>
            <View className="">
                <Text className="text-[#8C9FD0] text-xl font-medium">{currency} {amount.toString().slice(0, 5)}</Text>
            </View>
        </View>
    )
}
export default Tx;