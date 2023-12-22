import { useFonts, Poppins_600SemiBold, Poppins_400Regular, Poppins_500Medium } from "@expo-google-fonts/poppins";
import { useState } from "react";
import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import FaIcon from 'react-native-vector-icons/FontAwesome5'

export default function Signup({ navigation }) {

    let [fontsLoaded, fontsError] = useFonts({
        Poppins_600SemiBold,
        Poppins_400Regular,
        Poppins_500Medium
    })

    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)

    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
        passwordConfirm: ''
    })

    const { email, password, passwordConfirm } = userInfo

    function editUserInfo(name, value) {
        setUserInfo(prevInfo => ({ ...prevInfo, [name]: value }))
    }

    async function signupUser() {

        navigation.navigate('Onboarding1')
    }

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
                    <Text style={{ fontFamily: 'Poppins_600SemiBold' }} className='text-[#1E1E1E] mt-8 text-[24px]'>Sign Up</Text>
                    <View className='mt-8'>
                        <View className=''>
                            <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-sm text-[#1E1E1E]'>Email</Text>
                            <TextInput
                                placeholder="Enter your email address"
                                value={email}
                                style={{ fontFamily: 'Poppins_400Regular' }}
                                onChange={text => editUserInfo('email', text)}
                                keyboardType="email-address"
                                className='bg-transparent rounded-lg border-[1px] mt-2 border-[#E0E0E0] py-3 px-4'
                            />
                        </View>
                        <View className='mt-8 '>
                            <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-sm text-[#1E1E1E]'>Password</Text>
                            <View className='flex flex-row items-center  rounded-lg border-[1px] mt-2 border-[#E0E0E0] py-3 px-4'>
                                <TextInput
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={text => editUserInfo('password', text)}
                                    secureTextEntry={showPassword ? false : true}
                                    style={{ fontFamily: 'Poppins_400Regular' }}
                                    className='flex-1 bg-transparent'
                                />
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                    <FaIcon
                                        name={showPassword ? 'eye' : 'eye-slash'}
                                        size={20}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View className='mt-8'>
                            <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-sm text-[#1E1E1E]'>Confirm Password</Text>
                            <View className='flex flex-row items-center  rounded-lg border-[1px] mt-2 border-[#E0E0E0] py-3 px-4'>
                                <TextInput
                                    placeholder="Re-enter your password"
                                    value={password}
                                    onChange={text => editUserInfo('passwordConfirm', text)}
                                    secureTextEntry={showPasswordConfirm ? false : true}
                                    style={{ fontFamily: 'Poppins_400Regular' }}
                                    className='flex-1 bg-transparent'
                                />
                                <TouchableOpacity onPress={() => setShowPasswordConfirm(!showPasswordConfirm)}>
                                    <FaIcon
                                        name={showPasswordConfirm ? 'eye' : 'eye-slash'}
                                        size={20}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View className='mt-20'>
                        <TouchableOpacity className='mt-12 w-full' onPress={signupUser}>
                            <View className='bg-[#4169E1] py-[18px] flex items-center rounded-xl'>
                                <Text style={{ fontFamily: 'Poppins_500Medium' }} className='text-[#ffffff] text-sm'>Sign Up</Text>
                            </View>
                        </TouchableOpacity>
                        <View className='flex flex-row justify-between items-center py-8 gap-4'>
                            <View className='flex-1 border-b-[1px] border-[#a7a9ab]'></View>
                            <Text className='text-[#a7a9ab]'>OR</Text>
                            <View className='flex-1 border-b-[1px] border-[#a7a9ab]'></View>
                        </View>
                        <TouchableOpacity className='w-full'>
                            <View className='border-[1px] border-[#DADADA] py-[18px] flex flex-row justify-center items-center  rounded-xl'>
                                <Image
                                    source={require('../assets/flat-color-icons-google.png')}
                                />
                                <Text style={{ fontFamily: 'Poppins_500Medium' }} className='text-[#1C1C1C] ml-2 text-sm'>Continue with Google</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View className='flex flex-row items-center gap-1 justify-center mt-10'>
                        <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-[#1E1E1E]'>Already have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-[#4169E1]'>Log In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}
