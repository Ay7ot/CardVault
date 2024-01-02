import { Image, Text, TouchableOpacity, View } from "react-native";
import { useFonts, Poppins_400Regular, Poppins_500Medium } from "@expo-google-fonts/poppins";
import { useNavigation } from "@react-navigation/native";


export default function AddCard({ card }) {

    const navigation = useNavigation()

    let [fontsLoaded, fontsError] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium
    })

    function addNewCard() {
        if (card === 'ID Card') {
            navigation.navigate('Add_Id_Card')
        } else if (card === 'Debit Card') {
            navigation.navigate('Add_Debit_Card')
        } else if (card === 'Drivers License') {
            navigation.navigate('Add_Drivers_License')
        }
    }

    if (!fontsLoaded && !fontsError) {
        return null;
    }

    return (
        <View className='flex-grow flex items-center justify-center'>
            <Image
                source={require('../../../assets/image-7.png')}
            />
            <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-center text- leading-6'>
                You have no cards saved {`\n`}
                would you like to save one?
            </Text>
            <TouchableOpacity onPress={addNewCard} className='bg-[#4169E1] flex items-center mx-10 py-4 px-16 rounded-xl mt-8'>
                <Text style={{ fontFamily: 'Poppins_500Medium' }} className='text-white'>Add Card</Text>
            </TouchableOpacity>
        </View>
    )
}
