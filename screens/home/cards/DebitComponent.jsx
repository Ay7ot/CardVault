import React from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import { useFonts, Poppins_400Regular, Poppins_500Medium } from "@expo-google-fonts/poppins";
import Icon from 'react-native-vector-icons/Ionicons'
import * as Clipboard from 'expo-clipboard';


export default function DebitComponent({ card }) {
    let [fontsLoaded, fontsError] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium
    })

    function UseCard(type) {
        if (type?.toLowerCase() === 'visa') {
            return (
                <Image
                    source={require('../../../assets/r-1.png')}
                />
            )
        } else if (type?.toLowerCase() === 'mastercard') {
            return (
                <Image
                    source={require('../../../assets/image-51.png')}
                />
            )
        } else if (type?.toLowerCase() === 'verve') {
            return (
                <Image
                    source={require('../../../assets/image-52.png')}
                />
            )
        } else return
    }

    function formatCardNumber(cardNumber) {
        // Remove non-numeric characters
        const cleanedNumber = cardNumber.replace(/\D/g, '');

        // Use a regular expression to add dashes every four digits
        const formattedNumber = cardNumber.replace(/(\d{4})/g, '$1 ');

        // Remove the trailing dash if present
        return formattedNumber.endsWith(' ') ? formattedNumber.slice(0, -1) : formattedNumber;
    }

    const handleCopyToClipboard = async (valueToCopy) => {
        try {
            await Clipboard.setStringAsync(valueToCopy);
            alert('Copied to clipboard!');
        } catch (error) {
            console.error('Error copying to clipboard:', error);
            alert('Error copying to clipboard')
        }
    };

    if (!fontsLoaded && !fontsError) {
        return null;
    }

    return (
        <View className='bg-white rounded-xl p-4'>
            <View className='h-[64px] flex max-w-[64px] mb-4'>
                <Image
                    resizeMode='contain'
                    className='w-full flex-1'
                    source={{ uri: card.bank_logo }}
                />
            </View>
            <View className='flex flex-row justify-between'>
                <View className='border-b-[1px] flex-row pb-2 items-center border-[#F0F2F5]'>
                    <View className='flex flex-row'>
                        <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-sm'>CVV :</Text>
                        <Text style={{ fontFamily: 'Poppins_500Medium' }} className='text-sm'> {card.cvv}</Text>
                    </View>
                    <Pressable onPress={() => handleCopyToClipboard(card.cvv.toString())} className='flex flex-row items-center ml-6'>
                        <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-[8px] mr-2'>copy</Text>
                        <Icon
                            name='copy'
                            size={14}
                            color={'#4169E1'}
                        />
                    </Pressable>
                </View>
                <View className='border-b-[1px] flex-row ml-4 pb-2 items-center border-[#F0F2F5]'>
                    <View className='flex flex-row'>
                        <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-sm'>Expiry date :</Text>
                        <Text style={{ fontFamily: 'Poppins_500Medium' }} className='text-sm'> {card.expiry_date}</Text>
                    </View>
                    <Pressable onPress={() => handleCopyToClipboard(card.expiry_date)} className='flex flex-row items-center ml-6'>
                        <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-[8px] mr-2'>copy</Text>
                        <Icon
                            name='copy'
                            size={14}
                            color={'#4169E1'}
                        />
                    </Pressable>
                </View>
            </View>
            <View>
                <View className='border-b-[1px] mt-8 flex-row pb-2 items-center border-[#F0F2F5]'>
                    <View className='flex flex-row'>
                        <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-sm'>Card No :</Text>
                        <Text style={{ fontFamily: 'Poppins_500Medium' }} className='text-sm'> {formatCardNumber(card.card_number.toString())}</Text>
                    </View>
                    <Pressable onPress={() => handleCopyToClipboard(card.card_number.toString())} className='flex flex-row items-center ml-6'>
                        <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-[8px] mr-2'>copy</Text>
                        <Icon
                            name='copy'
                            size={14}
                            color={'#4169E1'}
                        />
                    </Pressable>
                </View>
            </View>
            <View className='mt-8 flex-row justify-between items-center'>
                <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-sm'>{card.full_name.toUpperCase()}</Text>
                {UseCard(card.card_type)}
            </View>
        </View>
    )
}
