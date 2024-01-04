import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native'
import { useFonts, Poppins_400Regular, Poppins_500Medium } from "@expo-google-fonts/poppins";
import { useGeneralAppContext } from '../../../utils/useGeneralAppContext';
import { supabase } from '../../../utils/supabase';
import AddCard from './AddCard';
import IdComponent from './IdComponent';
import { useNavigation } from '@react-navigation/native';
import AppleStyleSwipeableRow from './AppleStyleSwipable';

export default function IdCards() {

    let [fontsLoaded, fontsError] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium
    })
    const [loading, setLoading] = useState(false)
    const [idcards, setIdCards] = useState([])
    const { user } = useGeneralAppContext()

    useEffect(() => {
        async function fetchIdCards() {
            setLoading(true)
            try {
                let { data: id_cards, error } = await supabase
                    .from('id_cards')
                    .select('*')
                    .eq('user_id', user.id)
                setIdCards(id_cards)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchIdCards()
    }, [])

    const navigation = useNavigation()

    const channels = supabase.channel('custom-all-channel-for-Id-cards-table')
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'id_cards' },
            (payload) => {
                console.log('Change received!', payload)
                const { new: newCard, old: oldCard } = payload

                let newCards;
                const findCard = idcards.find(card => card.id === newCard.id)

                if (findCard && payload.eventType === 'UPDATE') {
                    setIdCards((prevCards) => {
                        return prevCards.map(card => {
                            if (card.id === newCard.id) {
                                return {
                                    ...newCard
                                }
                            } else return card
                        })
                    })
                } else if (!findCard && payload.eventType === 'INSERT') {
                    setIdCards((prevcards) => [...prevcards, newCard])
                } else if (payload.eventType === 'DELETE') {
                    setIdCards(prevCards => prevCards.filter((card) => card.id !== oldCard.id))
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
                idcards.length > 0 ?
                    <View className=' mb-[150px]'>
                        <TouchableOpacity onPress={() => navigation.navigate('Add_Id_Card')} className='bg-[#4169E1] flex items-center py-4 mb-4 rounded-xl mt-8'>
                            <Text style={{ fontFamily: 'Poppins_500Medium' }} className='text-white'>Add Card</Text>
                        </TouchableOpacity>
                        <ScrollView className='mb-[200px]'>
                            {idcards.map((card) => {
                                return (
                                    <View key={card.id} className='mb-10 shadow-md'>
                                        <AppleStyleSwipeableRow card={card}>
                                            <IdComponent card={card} />
                                        </AppleStyleSwipeableRow>
                                    </View>
                                )
                            })}
                        </ScrollView>
                    </View> :
                    <View className='flex-1'>
                        <AddCard card={'ID Card'} />
                    </View>
            }
        </View >
    )
}
