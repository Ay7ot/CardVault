import { useNavigation } from '@react-navigation/native'
import { useFonts, Poppins_400Regular, Poppins_500Medium } from "@expo-google-fonts/poppins";
import { View, SafeAreaView, Text, TouchableOpacity, TouchableWithoutFeedback, ScrollView, ActivityIndicator, TextInput, KeyboardAvoidingView, Modal, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { supabase } from '../../../utils/supabase';
import SuccessfulModal from './SuccessfulModal';

export default function AddDebitCard({ navigation, route }) {

    let [fontsLoaded, fontsError] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium
    })
    const [createOrUpdate, setCreateOrUpdate] = useState('')
    const [loading, setLoading] = useState(false)
    const [addCardLoadState, setAddCardLoadState] = useState(false)
    const [banks, setBanks] = useState([])
    const [showCardType, setShowCardType] = useState(false)
    const [showBanks, setShowBanks] = useState(false)
    const [showSuccessful, setShowSuccessful] = useState(false)
    const [cardInformation, setCardInformation] = useState({
        full_name: '',
        bank_name: '',
        card_type: '',
        card_number: '',
        cvv: '',
        expiry_date: '',
        bank_logo: ''
    })
    const [error, setError] = useState({
        type: '',
        message: ''
    })

    function runCheck(value, name) {
        if (name === '') {
            setError({
                type: 'error',
                message: `${value.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} cannot be empty`
            })
            return false
        } else {
            return true
        }
    }

    useEffect(() => {

        async function getAllBanks() {
            setLoading(true)
            try {
                const allBanks = await axios.get('https://nigerianbanks.xyz/')
                setBanks(allBanks.data)
            } catch (error) {
                console.error(error)
                navigation.navigate('Add_Id_Card')
            } finally {
                setLoading(false)
            }
        }

        getAllBanks()

        if (route.params?.state) {
            const idValues = route.params?.state
            console.log(idValues)
            setCardInformation({
                ...idValues,

            })
            setCreateOrUpdate('update')
        } else {
            setCreateOrUpdate('create')
        }
    }, [])

    const { full_name, bank_name, card_type, card_number, cvv, expiry_date, bank_logo } = cardInformation

    async function uploadCardToDatabase() {

        const cvvValid = runCheck('cvv', cvv)
        const expiryValid = runCheck('expiry_date', expiry_date)
        const logoValid = runCheck('bank_logo', bank_logo)
        const cardNumberValid = runCheck('card_number', card_number)
        const cardTypeValid = runCheck('card_type', card_type)
        const bankValid = runCheck('bank_name', bank_name)
        const nameValid = runCheck('full_name', full_name)

        if (nameValid && bankValid && cardTypeValid && cardNumberValid && expiryValid && logoValid && cvvValid) {
            try {
                setAddCardLoadState(true)
                const { data, error } = await supabase
                    .from('debit_cards')
                    .insert([
                        {
                            full_name: full_name,
                            bank_name: bank_name,
                            card_type: card_type,
                            card_number: card_number,
                            expiry_date: expiry_date,
                            bank_logo: bank_logo,
                            cvv: cvv
                        },
                    ])
                    .select()

                if (error) {
                    setError({ type: 'error', message: error.message })
                } else {
                    setCardInformation({
                        full_name: '',
                        bank_name: '',
                        card_type: '',
                        card_number: '',
                        cvv: '',
                        expiry_date: '',
                        bank_logo: ''
                    })
                    setShowSuccessful(true)
                }
            } catch (error) {
                setError({ type: 'error', message: error.message })
            } finally {
                setAddCardLoadState(false)
                setTimeout(() => {
                    setError({ type: '', message: '' })
                }, 3000)
            }
        } else {
            setTimeout(() => {
                setError({ type: '', message: '' })
            }, 3000)
        }
    }

    async function updateCardOnDatabase() {

        const cvvValid = runCheck('cvv', cvv)
        const expiryValid = runCheck('expiry_date', expiry_date)
        const logoValid = runCheck('bank_logo', bank_logo)
        const cardNumberValid = runCheck('card_number', card_number)
        const cardTypeValid = runCheck('card_type', card_type)
        const bankValid = runCheck('bank_name', bank_name)
        const nameValid = runCheck('full_name', full_name)

        if (nameValid && bankValid && cardTypeValid && cardNumberValid && expiryValid && logoValid && cvvValid) {
            try {
                setAddCardLoadState(true)
                const { data, error } = await supabase
                    .from('debit_cards')
                    .update([
                        {
                            full_name: full_name,
                            bank_name: bank_name,
                            card_type: card_type,
                            card_number: card_number,
                            expiry_date: expiry_date,
                            bank_logo: bank_logo,
                            cvv: cvv
                        },
                    ])
                    .eq('id', cardInformation.id)
                    .select()

                if (error) {
                    setError({ type: 'error', message: error.message })
                } else {
                    setCardInformation({
                        full_name: '',
                        bank_name: '',
                        card_type: '',
                        card_number: '',
                        cvv: '',
                        expiry_date: '',
                        bank_logo: ''
                    })
                    setShowSuccessful(true)
                }
            } catch (error) {
                setError({ type: 'error', message: error.message })
            } finally {
                setAddCardLoadState(false)
                setTimeout(() => {
                    setError({ type: '', message: '' })
                }, 3000)
            }
        } else {
            setTimeout(() => {
                setError({ type: '', message: '' })
            }, 3000)
        }
    }


    if (!fontsLoaded && !fontsError) {
        return null;
    }

    return (
        <View className='flex'>
            {loading ?
                <SafeAreaView>
                    <View className='h-full flex items-center justify-center'>
                        <ActivityIndicator size='small' color='#4169E1' />
                    </View>
                </SafeAreaView> :
                <SafeAreaView>
                    <KeyboardAvoidingView behavior="padding">
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
                                    Add Debit Card
                                </Text>
                                <View></View>
                            </View>
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                className='mt-8 flex-grow h-full mb-6'>

                                <View className='flex-1'>
                                    <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-sm text-[#1E1E1E]'>Full Name</Text>
                                    <TextInput
                                        placeholder="Enter name on card"
                                        value={full_name}
                                        style={{ fontFamily: 'Poppins_400Regular' }}
                                        onChangeText={text => setCardInformation((prevInfo) => ({ ...prevInfo, full_name: text }))}
                                        className='bg-transparent rounded-lg border-[1px] mt-2 border-[#E0E0E0] py-3 px-4 focus:border-[1px] focus:border-[#4169E1]'
                                    />
                                </View>

                                <View className='flex-1 mt-8'>
                                    <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-sm text-[#1E1E1E]'>Card Type</Text>
                                    <TouchableOpacity onPress={() => setShowCardType(true)} className='bg-transparent flex flex-row justify-between items-center rounded-lg border-[1px] mt-2 border-[#E0E0E0] py-3 px-4 focus:border-[1px] focus:border-[#4169E1]'>
                                        <Text style={{ fontFamily: 'Poppins_400Regular' }} className={`${card_type === '' ? 'text-[#bcbbbb]' : 'text-[#1E1E1E]'}`}>{`${card_type === '' ? 'Choose type' : `${card_type}`}`}</Text>
                                        <Icon
                                            name='down'
                                            size={16}
                                        />
                                    </TouchableOpacity>
                                    <Modal animationType='slide' visible={showCardType} transparent={true} onRequestClose={() => setShowCardType(false)}>
                                        <View className='bg-transparent flex-1'>
                                            <TouchableWithoutFeedback onPress={() => setShowCardType(false)}><View className='flex-1 bg-[#00000080]'></View></TouchableWithoutFeedback>
                                            <View className='bg-white p-8 py-10 rounded-[24px] shadow-lg  absolute bottom-0 w-full'>
                                                <Pressable
                                                    onPress={() => {
                                                        setCardInformation(prevInfo => ({ ...prevInfo, card_type: 'VISA' }))
                                                        setShowCardType(false)
                                                    }}
                                                    className={`flex flex-row items-center p-4 ${card_type === 'VISA' ? 'bg-blue-300/20 rounded-xl' : ''}`}
                                                >
                                                    <View className='h-[24px] flex items-center p-1 w-[24px] border-[#4169E1] border-[1px] rounded-full'>
                                                        <View className={`h-full w-full rounded-full bg-[#4169E1] ${card_type === 'VISA' ? '' : 'hidden'}`}></View>
                                                    </View>
                                                    <Text style={{ fontFamily: 'Poppins_400Regular' }} className='ml-4 uppercase'>VISA</Text>
                                                </Pressable>
                                                <Pressable
                                                    onPress={() => {
                                                        setCardInformation(prevInfo => ({ ...prevInfo, card_type: 'MASTERCARD' }))
                                                        setShowCardType(false)
                                                    }}
                                                    className={`flex flex-row items-center p-4 ${card_type === 'MASTERCARD' ? 'bg-blue-300/20 rounded-xl' : ''}`}
                                                >
                                                    <View className='h-[24px] flex items-center p-1 w-[24px] border-[#4169E1] border-[1px] rounded-full'>
                                                        <View className={`h-full w-full rounded-full bg-[#4169E1] ${card_type === 'MASTERCARD' ? '' : 'hidden'}`}></View>
                                                    </View>
                                                    <Text style={{ fontFamily: 'Poppins_400Regular' }} className='ml-4 uppercase'>MASTERCARD</Text>
                                                </Pressable>
                                                <Pressable
                                                    onPress={() => {
                                                        setCardInformation(prevInfo => ({ ...prevInfo, card_type: 'VERVE' }))
                                                        setShowCardType(false)
                                                    }}
                                                    className={`flex flex-row items-center p-4 ${card_type === 'VERVE' ? 'bg-blue-300/20 rounded-xl' : ''}`}
                                                >
                                                    <View className='h-[24px] flex items-center p-1 w-[24px] border-[#4169E1] border-[1px] rounded-full'>
                                                        <View className={`h-full w-full rounded-full bg-[#4169E1] ${card_type === 'VERVE' ? '' : 'hidden'}`}></View>
                                                    </View>
                                                    <Text style={{ fontFamily: 'Poppins_400Regular' }} className='ml-4 uppercase'>VERVE</Text>
                                                </Pressable>
                                            </View>
                                        </View>
                                    </Modal>
                                </View>

                                <View className='flex-1 mt-8'>
                                    <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-sm text-[#1E1E1E]'>Bank name</Text>
                                    <TouchableOpacity onPress={() => setShowBanks(true)} className='bg-transparent flex flex-row justify-between items-center rounded-lg border-[1px] mt-2 border-[#E0E0E0] py-3 px-4 focus:border-[1px] focus:border-[#4169E1]'>
                                        <Text style={{ fontFamily: 'Poppins_400Regular' }} className={`${bank_name === '' ? 'text-[#bcbbbb]' : 'text-[#1E1E1E]'}`}>{`${bank_name === '' ? 'Choose bank' : `${bank_name}`}`}</Text>
                                        <Icon
                                            name='down'
                                            size={16}
                                        />
                                    </TouchableOpacity>
                                    <Modal animationType='slide' visible={showBanks} transparent={true} onRequestClose={() => setShowBanks(false)}>
                                        <View className='bg-transparent flex-1'>
                                            <TouchableWithoutFeedback onPress={() => setShowBanks(false)}><View className='flex-1 bg-[#00000080]'></View></TouchableWithoutFeedback>
                                            <ScrollView showsVerticalScrollIndicator={false} className='bg-white p-8 py-10 rounded-[24px] absolute bottom-0 h-[400px] shadow-lg w-full'>
                                                <SafeAreaView className='mb-[80px]'>
                                                    {banks.map((bank, index) => {
                                                        return (
                                                            <Pressable
                                                                key={index}
                                                                onPress={() => {
                                                                    setCardInformation(prevInfo => ({ ...prevInfo, bank_name: bank.name, bank_logo: bank.logo }))
                                                                    setShowBanks(false)
                                                                }}
                                                                className={`flex flex-row items-center p-4 ${bank_name === bank.name ? 'bg-blue-300/20 rounded-xl' : ''}`}
                                                            >
                                                                <View className='h-[24px] flex items-center p-1 w-[24px] border-[#4169E1] border-[1px] rounded-full'>
                                                                    <View className={`h-full w-full rounded-full bg-[#4169E1] ${bank_name === bank.name ? '' : 'hidden'}`}></View>
                                                                </View>
                                                                <Text style={{ fontFamily: 'Poppins_400Regular' }} className='ml-4 uppercase'>{bank.name}</Text>
                                                            </Pressable>
                                                        )
                                                    })}
                                                </SafeAreaView>
                                            </ScrollView>
                                        </View>
                                    </Modal>
                                </View>

                                <View className='flex-1 mt-8'>
                                    <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-sm text-[#1E1E1E]'>Card Number</Text>
                                    <TextInput
                                        placeholder="Enter card number"
                                        value={card_number}
                                        style={{ fontFamily: 'Poppins_400Regular' }}
                                        keyboardType='numeric'
                                        onChangeText={text => setCardInformation((prevInfo) => ({ ...prevInfo, card_number: text }))}
                                        className='bg-transparent rounded-lg border-[1px] mt-2 border-[#E0E0E0] py-3 px-4 focus:border-[1px] focus:border-[#4169E1]'
                                    />
                                </View>

                                <View className='flex-1 mt-8'>
                                    <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-sm text-[#1E1E1E]'>CVV</Text>
                                    <TextInput
                                        placeholder="Enter the 3 digit number"
                                        value={cvv}
                                        style={{ fontFamily: 'Poppins_400Regular' }}
                                        keyboardType='numeric'
                                        onChangeText={text => setCardInformation((prevInfo) => ({ ...prevInfo, cvv: text }))}
                                        className='bg-transparent rounded-lg border-[1px] mt-2 border-[#E0E0E0] py-3 px-4 focus:border-[1px] focus:border-[#4169E1]'
                                    />
                                </View>

                                <View className='flex-1 mt-8'>
                                    <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-sm text-[#1E1E1E]'>Expiry Date</Text>
                                    <TextInput
                                        placeholder="MM/YY"
                                        value={expiry_date}
                                        style={{ fontFamily: 'Poppins_400Regular' }}
                                        onChangeText={text => setCardInformation((prevInfo) => ({ ...prevInfo, expiry_date: text }))}
                                        className='bg-transparent rounded-lg border-[1px] mt-2 border-[#E0E0E0] py-3 px-4 focus:border-[1px] focus:border-[#4169E1]'
                                    />
                                </View>

                            </ScrollView>
                            {error.type === 'error' && <Text style={{ fontFamily: 'Poppins_500Medium' }} className={`${error.type === 'error' ? 'text-red-500' : 'text-green-500'} my-4`}>{error.message}</Text>}
                            <TouchableOpacity onPress={createOrUpdate === 'create' ? uploadCardToDatabase : updateCardOnDatabase} className='bg-[#4169E1] py-4 mt-auto flex items-center rounded-xl'>
                                {addCardLoadState ?
                                    <ActivityIndicator size={'small'} color={'#ffffff'} /> :
                                    <Text style={{ fontFamily: 'Poppins_500Medium' }} className='text-white'>Save Card</Text>
                                }
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                    <SuccessfulModal isVisible={showSuccessful} />
                </SafeAreaView>
            }
        </View>
    )
}
