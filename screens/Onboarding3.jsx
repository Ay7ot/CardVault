import { useFonts, Poppins_600SemiBold, Poppins_400Regular, Poppins_500Medium } from "@expo-google-fonts/poppins";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/AntDesign'

export default function Onboarding3({ navigation }) {

    let [fontsLoaded, fontsError] = useFonts({
        Poppins_600SemiBold,
        Poppins_400Regular,
        Poppins_500Medium
    })

    if (!fontsLoaded && !fontsError) {
        return null;
    }

    return (

        <ScrollView>
            <SafeAreaView className='flex-1 min-h-screen flex-col p-6'>
                <View className='flex flex-row items-center z-[2] justify-between'>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon
                            name="arrowleft"
                            size={24}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
                        <Text style={{ fontFamily: 'Poppins_500Medium' }} className='text-[#4169E1] text-[16px]'>Skip</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <View className='h-[350px] w-[350px] mt-12 relative rounded-full bg-[#4169E11A]'>
                        <Image
                            source={require('../assets/image-4.png')}
                            className='absolute bottom-10 -left-7'
                        />
                    </View>
                    <Text style={{ fontFamily: 'Poppins_600SemiBold' }} className='text-[32px] text-[#1E1E1E] text-center mt-8' >Easy Organization</Text>
                    <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-center text-base px-[60px] text-[#1e1e1e] mt-6'>Effortlessly organize your various cards
                        in one central location.
                    </Text>
                </View>
                <View className='mt-auto flex flex-row items-center justify-between'>
                    <View className='flex flex-row gap-3'>
                        <View className='h-2 w-2 bg-[#C7E1FF] rounded-md'></View>
                        <View className='h-2 w-2 bg-[#C7E1FF] rounded-md'></View>
                        <View className='h-2 w-6 bg-[#4169E1] rounded-md'></View>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} className='bg-[#4169E1] py-4 px-20 rounded-xl'>
                        <Text style={{ fontFamily: 'Poppins_500Medium' }} className='text-[#ffffff]'>Get Started</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}
