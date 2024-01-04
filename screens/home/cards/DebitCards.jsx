import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native'
import { useFonts, Poppins_400Regular, Poppins_500Medium } from "@expo-google-fonts/poppins";
import { useGeneralAppContext } from '../../../utils/useGeneralAppContext';
import { supabase } from '../../../utils/supabase';
import AddCard from './AddCard';
import IdComponent from './IdComponent';
import { useNavigation } from '@react-navigation/native';
import AppleStyleSwipeableRow from './AppleStyleSwipable';
import DebitComponent from './DebitComponent';

export default function DebitCards() {

    let [fontsLoaded, fontsError] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium
    })
    const [loading, setLoading] = useState(false)
    const [debitCards, setDebitCards] = useState([])
    const { user } = useGeneralAppContext()

    useEffect(() => {
        async function fetchDebitCards() {
            setLoading(true)
            try {
                let { data: debit_cards, error } = await supabase
                    .from('debit_cards')
                    .select('*')
                    .eq('user_id', user.id)
                setDebitCards(debit_cards)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchDebitCards()
    }, [])

    const navigation = useNavigation()

    const channels = supabase.channel('custom-all-channel-for-debit-cards-table')
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'debit_cards' },
            (payload) => {
                console.log('Change received!', payload)
                const { new: newCard, old: oldCard } = payload

                const findCard = debitCards.find(card => card.id === newCard.id)

                if (findCard && payload.eventType === 'UPDATE') {
                    setDebitCards((prevCards) => {
                        return prevCards.map(card => {
                            if (card.id === newCard.id) {
                                return {
                                    ...newCard
                                }
                            } else return card
                        })
                    })
                } else if (!findCard && payload.eventType === 'INSERT') {
                    setDebitCards((prevcards) => [...prevcards, newCard])
                } else if (payload.eventType === 'DELETE') {
                    setDebitCards(prevCards => prevCards.filter((card) => card.id !== oldCard.id))
                }

            }
        )
        .subscribe()

    if (!fontsLoaded && !fontsError) {
        return null;
    }

    return (
        <View className='flex-grow'>
            {loading ?
                <View className='flex-grow flex items-center justify-center'>
                    <ActivityIndicator size='small' color='#4169E1' />
                </View> :
                debitCards.length > 0 ?
                    <View className=' mb-[150px]'>
                        <TouchableOpacity onPress={() => navigation.navigate('Add_Debit_Card')} className='bg-[#4169E1] flex items-center py-4 mb-4 rounded-xl mt-8'>
                            <Text style={{ fontFamily: 'Poppins_500Medium' }} className='text-white'>Add Card</Text>
                        </TouchableOpacity>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            className='mb-[200px]'
                        >
                            {debitCards.map((card) => {
                                return (
                                    <View key={card.id} className='mb-10  shadow-md'>
                                        <AppleStyleSwipeableRow card={card} component={'debit_cards'}>
                                            <DebitComponent card={card} />
                                        </AppleStyleSwipeableRow>
                                    </View>
                                )
                            })}
                        </ScrollView>
                    </View> :
                    <View className='flex-1'>
                        <AddCard card={'Debit Card'} />
                    </View>
            }
        </View >
    )
}
