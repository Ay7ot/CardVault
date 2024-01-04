import { useFonts, Poppins_600SemiBold, Poppins_400Regular, Poppins_500Medium } from "@expo-google-fonts/poppins";
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, SafeAreaView, Text, View } from 'react-native';
import { supabase } from '../../utils/supabase';
import { useGeneralAppContext } from '../../utils/useGeneralAppContext';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LogoutModal from "./LogoutModal";
import ChooseCard from "./cards/ChooseCard";

export default function Home({ navigation }) {

    let [fontsLoaded, fontsError] = useFonts({
        Poppins_600SemiBold,
        Poppins_400Regular,
        Poppins_500Medium
    })

    const { generalDispatch, user } = useGeneralAppContext()
    const [username, setUsername] = useState('')
    const [loading, setLoading] = useState(false)
    const [showLogoutModal, setShowLogoutModal] = useState(false)

    async function logout() {

        try {
            let { error } = await supabase.auth.signOut()
            generalDispatch({
                type: 'setLoadPageShown',
                payload: {
                    loadPageShownPayload: false,
                },
            });
            if (error) {
                console.error(error)
            }
        } catch (error) {
            console.error(error)
        }

    }

    useEffect(() => {
        async function getUser() {
            setLoading(true)
            try {
                const { data: users, error } = await supabase
                    .from('users')
                    .select('username')
                    .eq('user_id', user?.id);
                setUsername(users[0].username)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        if (user) {
            getUser()
        } else {
            logout()
        }
    }, [])

    if (!fontsLoaded && !fontsError) {
        return null;
    }

    return (
        <SafeAreaView>
            {loading ?
                <View className='h-screen flex items-center justify-center'>
                    <ActivityIndicator size="large" color="#4169E1" />
                </View> :
                <View className='p-6 flex-grow flex flex-col'>
                    <View>
                        <View className='mb-4 flex flex-row gap-4 items-center'>
                            <Pressable onPress={() => setShowLogoutModal(true)} className='w-8 h-8 flex items-center justify-center rounded-full bg-[#4169E1]'>
                                <Icon name="walking" size={18} color={'#ffffff'} />
                            </Pressable>
                            <Text style={{ fontFamily: 'Poppins_500Medium' }} className='text-[18px] text-[#1e1e1e]'>{`Hey there ${username}`}</Text>
                        </View>
                        <View className='border-b-[2px] border-[#dfe0e1]'></View>
                    </View>
                    <ChooseCard />
                    <LogoutModal isVisible={showLogoutModal} toggleModal={setShowLogoutModal} />
                </View>
            }
        </SafeAreaView>
    );
};
