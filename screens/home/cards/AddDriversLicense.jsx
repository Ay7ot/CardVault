import { useNavigation } from '@react-navigation/native'
import { useFonts, Poppins_400Regular, Poppins_500Medium } from "@expo-google-fonts/poppins";
import { View, SafeAreaView, Text, TouchableOpacity, ScrollView, ActivityIndicator, TextInput, KeyboardAvoidingView } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AddDriversLicense() {

    let [fontsLoaded, fontsError] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium
    })
    const [loading, setLoading] = useState(false)
    const [addCardLoadState, setAddCardLoadState] = useState(false)
    const navigation = useNavigation()

    if (!fontsLoaded && !fontsError) {
        return null;
    }

    return (
        <View className='flex'>
            {loading ?
                <SafeAreaView>
                    <View className='h-full flex items-center justify-center'>
                        <ActivityIndicator size='small' color='#4169E1' />
                    </View>
                </SafeAreaView> :
                <SafeAreaView>
                    <KeyboardAvoidingView behavior="padding">
                        <View className='p-6'>
                            <View className='flex flex-row items-center justify-between'>
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <Icon
                                        name='arrowleft'
                                        size={20}
                                    />
                                </TouchableOpacity>
                                <Text
                                    style={{ fontFamily: 'Poppins_500Medium' }}
                                    className='text-2xl text-[#1E1E1E]'
                                >
                                    Add Drivers License
                                </Text>
                                <View></View>
                            </View>
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                className='mt-8 flex-grow h-full mb-6'
                            >

                            </ScrollView>

                            <TouchableOpacity className='bg-[#4169E1] py-4 mt-auto flex items-center rounded-xl'>
                                {addCardLoadState ?
                                    <ActivityIndicator size={'small'} color={'#ffffff'} /> :
                                    <Text style={{ fontFamily: 'Poppins_500Medium' }} className='text-white'>Save Card</Text>
                                }
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            }
        </View>
    )
}
