import { Text, View, SafeAreaView, Pressable } from 'react-native'
import { useFonts, Poppins_600SemiBold, Poppins_400Regular, Poppins_500Medium } from "@expo-google-fonts/poppins";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function Settings() {

    let [fontsLoaded, fontsError] = useFonts({
        Poppins_600SemiBold,
        Poppins_400Regular,
        Poppins_500Medium
    })

    const navigation = useNavigation()

    if (!fontsLoaded && !fontsError) {
        return null;
    }

    return (
        <View>
            <SafeAreaView>
                <View className='p-6'>
                    <View className='border-b-[1px] pb-6 border-b-[#d5d6d8]'>
                        <Text style={{ fontFamily: "Poppins_500Medium" }} className='text-center text-[24px]'>Settings</Text>
                    </View>
                    <View className='mt-8'>
                        <Pressable onPress={() => navigation.navigate('Change Password')} className='flex-row items-center p-4 justify-between'>
                            <Text style={{ fontFamily: "Poppins_400Regular" }} className='text-base'>Change password</Text>
                            <Icon name='chevron-forward' size={24} />
                        </Pressable>
                        <Pressable onPress={() => navigation.navigate('Change Password')} className='flex-row mt-3 p-4 items-center justify-between'>
                            <Text style={{ fontFamily: "Poppins_400Regular" }} className='text-base'>Log in with fingerprint</Text>
                            <Icon name='chevron-forward' size={24} />
                        </Pressable>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    )
}
