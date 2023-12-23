import { useFonts, Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { useGeneralAppContext } from "../utils/useGeneralAppContext";

export default function LoadPage({ navigation }) {

    const { session, user } = useGeneralAppContext()
    console.log(session, user)
    useEffect(() => {
        setTimeout(() => {
            if (session && user) {
                navigation.navigate('Dashboard')
            } else {
                navigation.navigate('Welcome')
            }
        }, 3000)
    }, [session, user])

    let [fontsLoaded, fontsError] = useFonts({
        Poppins_600SemiBold
    })

    if (!fontsLoaded && !fontsError) {
        return null;
    }

    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Text style={{ fontFamily: 'Poppins_600SemiBold' }} className='text-[#1e1e1e] text-[32px]'>Card Vault</Text>
        </View>
    )
}
