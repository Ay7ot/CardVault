import { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import AddCard from './AddCard'
import { useFonts, Poppins_400Regular, Poppins_500Medium } from "@expo-google-fonts/poppins";
import IdCards from './IdCards';
import DebitCards from './DebitCards';
import DriversLicenses from './DriversLicenses';

export default function ChooseCard() {

    const [cards, setCards] = useState([
        {
            name: 'ID Cards',
            isActive: true
        },
        {
            name: 'Driver\'s licenses',
            isActive: false
        },
        {
            name: 'Debit Cards',
            isActive: false
        },
    ])
    const [cardsToShow, setCardsToShow] = useState('ID Cards')
    let [fontsLoaded, fontsError] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium
    })

    function updateCardsToShow(name) {
        setCards((prevCards) => (prevCards.map(card => {
            if (card.name === name) {
                return { ...card, isActive: true }
            } else {
                return { ...card, isActive: false }
            }
        })))
        setCardsToShow(name)
    }

    function ShowCards(name) {
        if (name === 'ID Cards') {
            return <IdCards />
        } else if (name === 'Debit Cards') {
            return <DebitCards />
        } else {
            return <DriversLicenses />
        }
    }

    if (!fontsLoaded && !fontsError) {
        return null;
    }

    return (
        <View className='flex h-full flex-grow pt-6 w-full'>
            <View className='flex flex-row w-full items-center justify-between'>
                {cards.map((card, index) => {
                    return (
                        <Pressable
                            key={index}
                            onPress={() => updateCardsToShow(card.name)}
                            className={`${card.isActive ? 'border-b-[3px] border-[#4169E1]' : ''} flex-1 flex items-center w-full`}
                        >
                            <Text style={{ fontFamily: 'Poppins_500Medium' }} className={`${card.isActive ? 'text-[#4169E1]' : 'text-[#bebcbc]'} text-sm py-[10px]`}>{card.name}</Text>
                        </Pressable>
                    )
                })}
            </View>
            {/* <AddCard /> */}
            {ShowCards(cardsToShow)}
        </View>
    )
}
