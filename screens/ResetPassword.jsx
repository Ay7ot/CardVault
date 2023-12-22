import { useFonts, Poppins_600SemiBold, Poppins_400Regular } from "@expo-google-fonts/poppins";
import { useState } from "react";
import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import FaIcon from 'react-native-vector-icons/FontAwesome5'

export default function ResetPassword({ navigation }) {

    let [fontsLoaded, fontsError] = useFonts({
        Poppins_600SemiBold,
        Poppins_400Regular
    })

    const [email, setEmail] = useState('')

    if (!fontsLoaded && !fontsError) {
        return null;
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView>
                <View className='p-6'>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon
                            name="arrowleft"
                            size={24}
                        />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: 'Poppins_600SemiBold' }} className='text-[#1E1E1E] mt-8 text-[24px]'>Login</Text>

                    <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-[16px] mt-4'>
                        Enter your email address a link will be sent
                        for you to reset your password
                    </Text>

                    <View className='mt-8'>
                        <View className=''>
                            <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-sm text-[#1E1E1E]'>Email</Text>
                            <TextInput
                                placeholder="Enter your email address"
                                value={email}
                                style={{ fontFamily: 'Poppins_400Regular' }}
                                onChange={text => setEmail(text)}
                                keyboardType="email-address"
                                className='bg-transparent rounded-lg border-[1px] mt-2 border-[#E0E0E0] py-3 px-4'
                            />
                        </View>
                    </View>
                    <TouchableOpacity className='mt-40 w-full'>
                        <View className='bg-[#4169E1] py-[18px] flex items-center rounded-xl'>
                            <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-[#ffffff] text-sm'>Send</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}
