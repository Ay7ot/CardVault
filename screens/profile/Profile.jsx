import { Image, Pressable, SafeAreaView, Text, View } from "react-native";
import { useFonts, Poppins_600SemiBold, Poppins_400Regular, Poppins_500Medium } from "@expo-google-fonts/poppins";
import { useGeneralAppContext } from "../../utils/useGeneralAppContext";
import Icon from "react-native-vector-icons/Ionicons";
import { supabase } from "../../utils/supabase";

export default function Profile() {

    const { username, user, generalDispatch } = useGeneralAppContext();
    let [fontsLoaded, fontsError] = useFonts({
        Poppins_600SemiBold,
        Poppins_400Regular,
        Poppins_500Medium
    })

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

    if (!fontsLoaded && !fontsError) {
        return null;
    }

    return (
        <SafeAreaView>
            <View className='p-6 h-screen pb-[150px]'>
                <View className='border-b-[1px] pb-6 border-b-[#d5d6d8]'>
                    <Text style={{ fontFamily: "Poppins_500Medium" }} className='text-center text-[24px]'>Profile</Text>
                </View>
                <View className='flex-col mt-8 items-center justify-center'>
                    <Image
                        source={require('../../assets/profile-image.png')}
                    />
                    <Text style={{ fontFamily: 'Poppins_500Medium', fontSize: 24, marginTop: 12 }}>{username}</Text>
                    <Text style={{ fontFamily: 'Poppins_500Medium', fontSize: 14, marginTop: 12 }}>{user.email}</Text>
                </View>
                <Pressable onPress={logout} className='flex-row mt-auto items-center justify-center'>
                    <Text style={{ fontFamily: 'Poppins_500Medium', fontSize: 14, color: '#F84343' }}>Log out</Text>
                    <Icon
                        name="log-out-outline"
                        size={24}
                        color='#F84343'
                        style={{ marginLeft: 12, }}
                    />
                </Pressable>
            </View>
        </SafeAreaView>
    )
}
