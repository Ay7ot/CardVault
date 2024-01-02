import React from 'react'
import { Text, View } from 'react-native'
import { useFonts, Poppins_400Regular, Poppins_500Medium } from "@expo-google-fonts/poppins";

export default function DebitCards() {

    let [fontsLoaded, fontsError] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium
    })

    if (!fontsLoaded && !fontsError) {
        return null;
    }

    return (
        <View>
            <Text>Debit cards</Text>
        </View>
    )
}