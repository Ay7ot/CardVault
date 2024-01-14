import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native'
import { useFonts, Poppins_400Regular, Poppins_500Medium } from "@expo-google-fonts/poppins";
import { useGeneralAppContext } from '../../../utils/useGeneralAppContext';
import { supabase } from '../../../utils/supabase';
import AddCard from './AddCard';
import DriversComponent from './DriversComponent';
import { useNavigation } from '@react-navigation/native';
import AppleStyleSwipeableRow from './AppleStyleSwipable';

export default function DriversLicenses() {

    let [fontsLoaded, fontsError] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium
    })

    const [loading, setLoading] = useState(false)
    const [driversLicenses, setDriversLicenses] = useState([])
    const { user } = useGeneralAppContext()

    useEffect(() => {
        async function fetchDriversLicenses() {
            setLoading(true)
            try {
                let { data: drivers_licenses, error } = await supabase
                    .from('drivers_licenses')
                    .select('*')
                    .eq('user_id', user.id)
                setDriversLicenses(drivers_licenses)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchDriversLicenses()
    }, [])

    const navigation = useNavigation()

    const channels = supabase.channel('custom-all-channel-for-drivers-licenses-table')
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'drivers_licenses' },
            (payload) => {
                console.log('Change received!', payload)
                const { new: newCard, old: oldCard } = payload

                let newCards;
                const findCard = driversLicenses.find(card => card.id === newCard.id)

                if (findCard && payload.eventType === 'UPDATE') {
                    setDriversLicenses((prevCards) => {
                        return prevCards.map(card => {
                            if (card.id === newCard.id) {
                                return {
                                    ...newCard
                                }
                            } else return card
                        })
                    })
                } else if (!findCard && payload.eventType === 'INSERT') {
                    setDriversLicenses((prevcards) => [...prevcards, newCard])
                } else if (payload.eventType === 'DELETE') {
                    setDriversLicenses(prevCards => prevCards.filter((card) => card.id !== oldCard.id))
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
                driversLicenses.length > 0 ?
                    <View className=' mb-[150px]'>
                        <TouchableOpacity onPress={() => navigation.navigate('Add_Drivers_License')} className='bg-[#4169E1] flex items-center py-4 mb-4 rounded-xl mt-8'>
                            <Text style={{ fontFamily: 'Poppins_500Medium' }} className='text-white'>Add Card</Text>
                        </TouchableOpacity>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            className='mb-[200px]'
                        >
                            {driversLicenses.map((card) => {
                                return (
                                    <View key={card.id} className='mb-10 shadow-md'>
                                        <AppleStyleSwipeableRow card={card} component='drivers_license'>
                                            <DriversComponent card={card} />
                                        </AppleStyleSwipeableRow>
                                    </View>
                                )
                            })}
                        </ScrollView>
                    </View> :
                    <View className='flex-1'>
                        <AddCard card={'Drivers License'} />
                    </View>
            }
        </View >
    )
}
