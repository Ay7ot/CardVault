import { useFonts, Poppins_600SemiBold, Poppins_400Regular, Poppins_500Medium } from "@expo-google-fonts/poppins";
import { StatusBar } from "expo-status-bar";
import { Image, Platform, SafeAreaView, Text, TouchableOpacity, View } from "react-native";

export default function WelcomePage({ navigation }) {

    let [fontsLoaded, fontsError] = useFonts({
        Poppins_600SemiBold,
        Poppins_400Regular,
        Poppins_500Medium
    })

    if (!fontsLoaded && !fontsError) {
        return null;
    }

    return (
        <SafeAreaView className='flex-1'>
            <View className="flex-1 items-center justify-center w-full">
                <View className='h-[350px] w-[350px] mt-12 relative rounded-full bg-[#4169E11A]'>
                    <Image
                        source={require('../assets/image-5.png')}
                        className='absolute bottom-0 -right-[30px]'
                    />
                </View>
                <Text style={{ fontFamily: 'Poppins_600SemiBold' }} className='text-[#1e1e1e] mt-7 text-[32px] max-w-[200px]'>Welcome to Card Vault</Text>
                <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-[16px] mt-6 text-[#1e1e1e] px-[72px] text-center'>
                    Your all-in-one solution for securely
                    storing and managing your cards
                </Text>
                <TouchableOpacity className='mt-12 w-full px-8' onPress={() => navigation.navigate('Signup')}>
                    <View className='bg-[#4169E1] py-[18px] flex items-center rounded-xl'>
                        <Text style={{ fontFamily: 'Poppins_500Medium' }} className='text-[#ffffff] text-sm'>Sign Up</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity className='mt-4 w-full px-8' onPress={() => navigation.navigate('Login')}>
                    <View className='py-[18px] flex items-center rounded-xl'>
                        <Text style={{ fontFamily: 'Poppins_500Medium' }} className='text-[#1E1E1E] text-sm'>Login</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
