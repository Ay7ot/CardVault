import React, { useState } from 'react'
import { ActivityIndicator, KeyboardAvoidingView, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useFonts, Poppins_600SemiBold, Poppins_400Regular, Poppins_500Medium } from "@expo-google-fonts/poppins";
import FaIcon from 'react-native-vector-icons/FontAwesome5'
import Icon from 'react-native-vector-icons/AntDesign';
import { supabase } from '../../utils/supabase';
import ChangePasswordSuccessfulModal from './ChangePasswordSuccessfulModal';

export default function ChangePassword({ navigation }) {

    let [fontsLoaded, fontsError] = useFonts({
        Poppins_600SemiBold,
        Poppins_400Regular,
        Poppins_500Medium
    })

    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showSuccessful, setShowSuccessful] = useState(false)
    const [userInfo, setUserInfo] = useState({
        currentPassword: '',
        newPassword: ''
    })
    const [error, setError] = useState({
        type: '',
        message: ''
    })

    const { currentPassword, newPassword } = userInfo

    async function updatePassword() {
        setLoading(true)

        try {
            const { data, error } = await supabase.auth.updateUser({
                password: newPassword,
            })

            if (error) {
                setError({ type: 'error', message: error.message })
            } else {
                setShowSuccessful(true)
                console.log('done')
            }
        } catch (error) {
            console.error(error)
            setError({ type: 'error', message: error.message })
        } finally {
            setLoading(false)
        }
    }

    if (!fontsLoaded && !fontsError) {
        return null;
    }

    return (
        <SafeAreaView>
            <KeyboardAvoidingView behavior='padding'>
                <View className='p-6'>
                    <View className='flex-row justify-between'>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon
                                name="arrowleft"
                                size={24}
                            />
                        </TouchableOpacity>
                        <Text style={{ fontFamily: "Poppins_500Medium", fontSize: 24 }}>Change Password</Text>
                        <View></View>
                    </View>
                    <View className='mt-8 '>
                        <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-sm text-[#1E1E1E]'>Current Password</Text>
                        <View className='flex flex-row items-center relative'>
                            <TextInput
                                placeholder="Enter your current password"
                                value={currentPassword}
                                onChangeText={text => setUserInfo((prevInfo) => ({ ...prevInfo, currentPassword: text }))}
                                secureTextEntry={showCurrentPassword ? false : true}
                                style={{ fontFamily: 'Poppins_400Regular' }}
                                className='flex-1 bg-blue-300w-full rounded-lg border-[1px] mt-2 border-[#E0E0E0] py-3 px-4 focus:border-[#000000]'
                            />
                            <TouchableOpacity onPress={() => setShowCurrentPassword(!showCurrentPassword)} className='absolute right-4 bottom-3'>
                                <FaIcon
                                    name={showCurrentPassword ? 'eye' : 'eye-slash'}
                                    size={20}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className='mt-8 '>
                        <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-sm text-[#1E1E1E]'>New Password</Text>
                        <View className='flex flex-row items-center relative'>
                            <TextInput
                                placeholder="Enter your current password"
                                value={newPassword}
                                onChangeText={text => setUserInfo((prevInfo) => ({ ...prevInfo, newPassword: text }))}
                                secureTextEntry={showNewPassword ? false : true}
                                style={{ fontFamily: 'Poppins_400Regular' }}
                                className='flex-1 bg-blue-300w-full rounded-lg border-[1px] mt-2 border-[#E0E0E0] py-3 px-4 focus:border-[#000000]'
                            />
                            <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)} className='absolute right-4 bottom-3'>
                                <FaIcon
                                    name={showNewPassword ? 'eye' : 'eye-slash'}
                                    size={20}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View className={`w-full p-3 rounded-md mt-8 border-[1px] border-[#b2afaf] bg-red-400 ${error.message === '' ? 'hidden' : ''}`}>
                        <Text style={{ fontFamily: 'Poppins_500Medium' }} className='text-white'>{error.message}</Text>
                    </View>

                    <TouchableOpacity className='mt-32 w-full' onPress={updatePassword} disabled={loading}>
                        <View className='bg-[#4169E1] py-[18px] flex items-center rounded-xl'>
                            {loading ?
                                <ActivityIndicator size="small" color="#ffffff" /> :
                                <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-[#ffffff] text-sm'>Change Password</Text>
                            }
                        </View>
                    </TouchableOpacity>
                </View>
                <ChangePasswordSuccessfulModal isVisible={showSuccessful} />
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
