import { useFonts, Poppins_600SemiBold, Poppins_400Regular, Poppins_500Medium } from "@expo-google-fonts/poppins";
import { useState } from "react";
import { ActivityIndicator, Image, KeyboardAvoidingView, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import FaIcon from 'react-native-vector-icons/FontAwesome5'
import { supabase } from "../../utils/supabase";
import { useGeneralAppContext } from "../../utils/useGeneralAppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Signup({ navigation }) {

    let [fontsLoaded, fontsError] = useFonts({
        Poppins_600SemiBold,
        Poppins_400Regular,
        Poppins_500Medium
    })

    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
    const [error, setError] = useState({
        type: '',
        message: ''
    })
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
        passwordConfirm: '',
        username: ''
    })

    const { email, password, passwordConfirm, username } = userInfo
    const { generalDispatch } = useGeneralAppContext()

    const checkUsernameAvailability = async (username) => {
        // Query the database to check if the username already exists
        const { data: users, error } = await supabase
            .from('users')
            .select('username')
            .eq('username', username);

        // If data is returned, the username is taken
        // If error occurs, handle the error
        return { isAvailable: !users || users.length === 0, error };
    };

    async function signupUser() {
        // Regular expression for validating an Email
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const { isAvailable, error: usernameError } = await checkUsernameAvailability(username);

        if (email === '') {
            setError({
                type: 'Error',
                message: 'Email cannot be empty'
            })
        } else if (username === '') {
            setError({
                type: 'Error',
                message: 'Username cannot be empty'
            })
        } else if (password === '') {
            setError({
                type: 'Error',
                message: 'Password cannot be empty'
            })
        } else if (password !== passwordConfirm) {
            setError({
                type: 'Error',
                message: 'Passwords do not match'
            })
        } else if (!emailRegex.test(email)) {
            setError({
                type: 'Error',
                message: 'Enter a valid email'
            })
        } else if (!isAvailable) {
            setError({
                type: 'Error',
                message: 'Username is already taken'
            })
        } else {
            try {
                setLoading(true)
                let { data, error } = await supabase.auth.signUp({
                    email: email,
                    password: password
                })
                const user = data
                const userId = data?.user?.id
                const userEmail = data?.user?.email
                if (error) {
                    setError({
                        type: 'Error',
                        message: error.message
                    })
                } else if (data) {

                    const { data, error } = await supabase
                        .from('users')
                        .upsert([
                            {
                                user_id: userId,
                                username: username,
                                email: userEmail
                            },
                        ]);

                    generalDispatch({
                        type: 'setUserSession',
                        payload: {
                            sessionPayload: user.session
                        }
                    })
                    generalDispatch({
                        type: 'setUser',
                        payload: {
                            userPayload: user.user
                        }
                    })
                    generalDispatch({
                        type: 'setIsNewUser',
                        payload: {
                            isNewUserPayload: true,
                        },
                    });
                    await AsyncStorage.setItem('user', JSON.stringify(user.user));
                }
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        setTimeout(() => {
            setError({ type: '', message: '' })
        }, 5000)
    }

    if (!fontsLoaded && !fontsError) {
        return null;
    }


    return (
        <SafeAreaView>
            <KeyboardAvoidingView>
                <ScrollView className='p-6'>
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
                                onChangeText={text => setUserInfo((prevInfo) => ({ ...prevInfo, email: text }))}
                                keyboardType="email-address"
                                className='bg-transparent rounded-lg border-[1px] mt-2 border-[#E0E0E0] py-3 px-4 focus:border-[#000000]'
                            />
                        </View>
                        <View className='mt-8'>
                            <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-sm text-[#1E1E1E]'>Email</Text>
                            <TextInput
                                placeholder="Pick a username"
                                value={username}
                                style={{ fontFamily: 'Poppins_400Regular' }}
                                onChangeText={text => setUserInfo((prevInfo) => ({ ...prevInfo, username: text }))}
                                className='bg-transparent rounded-lg border-[1px] mt-2 border-[#E0E0E0] py-3 px-4 focus:border-[#000000]'
                            />
                        </View>
                        <View className='mt-8 '>
                            <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-sm text-[#1E1E1E]'>Password</Text>
                            <View className='flex flex-row items-center relative'>
                                <TextInput
                                    placeholder="Enter your password"
                                    value={password}
                                    onChangeText={text => setUserInfo((prevInfo) => ({ ...prevInfo, password: text }))}
                                    secureTextEntry={showPassword ? false : true}
                                    style={{ fontFamily: 'Poppins_400Regular' }}
                                    className='flex-1 bg-blue-300w-full rounded-lg border-[1px] mt-2 border-[#E0E0E0] py-3 px-4 focus:border-[#000000]'
                                />
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className='absolute right-4 bottom-3'>
                                    <FaIcon
                                        name={showPassword ? 'eye' : 'eye-slash'}
                                        size={20}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View className='mt-8'>
                            <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-sm text-[#1E1E1E]'>Confirm Password</Text>
                            <View className='flex flex-row items-center relative'>
                                <TextInput
                                    placeholder="Confirm your password"
                                    value={passwordConfirm}
                                    onChangeText={text => setUserInfo((prevInfo) => ({ ...prevInfo, passwordConfirm: text }))}
                                    secureTextEntry={showPasswordConfirm ? false : true}
                                    style={{ fontFamily: 'Poppins_400Regular' }}
                                    className='flex-1 bg-blue-300w-full rounded-lg border-[1px] mt-2 border-[#E0E0E0] py-3 px-4 focus:border-[#000000]'
                                />
                                <TouchableOpacity onPress={() => setShowPasswordConfirm(!showPasswordConfirm)} className='absolute right-4 bottom-3'>
                                    <FaIcon
                                        name={showPassword ? 'eye' : 'eye-slash'}
                                        size={20}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View className={`w-full p-3 rounded-md mt-8 border-[1px] border-[#b2afaf] bg-red-400 ${error.message === '' ? 'hidden' : ''}`}>
                            <Text style={{ fontFamily: 'Poppins_500Medium' }} className='text-white'>{error.message}</Text>
                        </View>
                    </View>
                    <View className='mt-4'>
                        <TouchableOpacity className='mt-12 w-full' onPress={signupUser} disabled={loading}>
                            <View className='bg-[#4169E1] py-[18px] flex items-center rounded-xl'>
                                {loading ?
                                    <ActivityIndicator size="small" color="#ffffff" /> :
                                    <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-[#ffffff] text-sm'>Signup</Text>
                                }
                            </View>
                        </TouchableOpacity>
                        {/* <View className='flex flex-row justify-between items-center py-8 gap-4'>
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
                        </TouchableOpacity> */}
                    </View>
                    <View className='flex flex-row items-center gap-1 justify-center mt-10'>
                        <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-[#1E1E1E]'>Already have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-[#4169E1]'>Log In</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
