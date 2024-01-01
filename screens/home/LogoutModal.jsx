import { ActivityIndicator, Modal, Pressable, Text, View } from "react-native";
import { useFonts, Poppins_600SemiBold, Poppins_400Regular, Poppins_500Medium } from "@expo-google-fonts/poppins";
import { useGeneralAppContext } from "../../utils/useGeneralAppContext";
import { supabase } from "../../utils/supabase";
import { useState } from "react";

export default function LogoutModal({ isVisible, toggleModal }) {

    let [fontsLoaded, fontsError] = useFonts({
        Poppins_600SemiBold,
        Poppins_400Regular,
        Poppins_500Medium
    })
    const { generalDispatch } = useGeneralAppContext()
    const [loading, setLoading] = useState(false)

    async function logout() {
        setLoading(true)
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
        } finally {
            setLoading(false)
        }
    }


    if (!fontsLoaded && !fontsError) {
        return null;
    }

    return (
        <Modal animationType="fade" visible={isVisible} transparent={true}>
            <View className='flex-1 bg-[#80808090] items-center justify-center'>
                <View className='bg-white p-8 rounded-[18px] shadow-lg'>
                    <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-[#1e1e1e] text-base mb-4'>Are you sure you want to Logout?</Text>
                    <View className='border-b-[2px] border-[#dfe0e1]'></View>
                    <View className='flex flex-row items-center justify-between mt-8'>
                        <Pressable onPress={() => toggleModal(false)} className='flex-1 bg-[#4169E1] flex items-center w-full py-3 rounded-xl'>
                            <Text style={{ fontFamily: 'Poppins_500Medium' }} className='text-white'>Cancel</Text>
                        </Pressable>
                        <Pressable onPress={logout} className='flex-1 bg-[#F84343] flex items-center w-full py-3 rounded-xl ml-4'>
                            {loading ? <ActivityIndicator size='small' color={'#ffffff'} /> : <Text style={{ fontFamily: 'Poppins_500Medium' }} className='text-white'>Logout</Text>}
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
