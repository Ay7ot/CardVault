import { ActivityIndicator, Image, Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import { useFonts, Poppins_600SemiBold, Poppins_400Regular, Poppins_500Medium } from "@expo-google-fonts/poppins";
import { useNavigation } from "@react-navigation/native";

export default function SuccessfulModal({ isVisible }) {

    let [fontsLoaded, fontsError] = useFonts({
        Poppins_600SemiBold,
        Poppins_400Regular,
        Poppins_500Medium
    })
    const navigation = useNavigation();

    if (!fontsLoaded && !fontsError) {
        return null;
    }

    return (
        <Modal animationType="fade" visible={isVisible} transparent={true}>
            <View className='flex-1 bg-[#80808090] px-8 items-center justify-center'>
                <View className='bg-white p-8 w-full rounded-[18px] shadow-lg flex flex-col items-center'>
                    <View className=''>
                        <Image
                            source={require('../../../assets/image-8.png')}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={{ fontFamily: 'Poppins_400Regular' }}>Card Saved Successfully</Text>
                    <TouchableOpacity onPress={() => navigation.goBack()} className='w-full py-4 flex items-center bg-[#4169E1] rounded-xl mt-6'>
                        <Text className='text-white' style={{ fontFamily: 'Poppins_500Medium' }}>Go Home</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}
