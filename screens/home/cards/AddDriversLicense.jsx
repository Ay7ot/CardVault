import { useNavigation } from '@react-navigation/native'
import { useFonts, Poppins_400Regular, Poppins_500Medium } from "@expo-google-fonts/poppins";
import { View, SafeAreaView, Text, TouchableOpacity, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';

export default function AddDriversLicense() {

    let [fontsLoaded, fontsError] = useFonts({
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
                            Add Driver's License
                        </Text>
                        <View></View>
                    </View>
                    <ScrollView>

                    </ScrollView>
                </View>
            </SafeAreaView>
        </View>
    )
}
