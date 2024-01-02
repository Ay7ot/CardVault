import { useNavigation } from '@react-navigation/native'
import { useFonts, Poppins_400Regular, Poppins_500Medium } from "@expo-google-fonts/poppins";
import { View, KeyboardAvoidingView, SafeAreaView, Text, TouchableOpacity, ScrollView, TextInput, Pressable, Modal, TouchableWithoutFeedback, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import { useEffect, useState } from 'react';
import axios from 'axios';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { useGeneralAppContext } from '../../../utils/useGeneralAppContext';
import { supabase } from '../../../utils/supabase';

export default function AddIdCard() {

    let [fontsLoaded, fontsError] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium
    })
    const [idInformation, setIdInformation] = useState({
        firstname: '',
        surname: '',
        middle_name: '',
        dob: new Date(),
        issue_date: new Date(),
        expiry_date: new Date(),
        sex: '',
        height: '',
        blood_group: '',
        nin: '',
        nationality: ''
    })
    const { user } = useGeneralAppContext()
    const [showSexModal, setShowSexModal] = useState(false)
    const [showDob, setShowDob] = useState(false)
    const [showExpiryDate, setShowExpiryDate] = useState(false)
    const [showIssueDate, setShowIssueDate] = useState(false)
    const [showNationalityModal, setShowNationalityModal] = useState(false)
    const [countries, setCountries] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({
        type: '',
        message: ''
    })

    const navigation = useNavigation()

    useEffect(() => {
        async function getAllCountries() {
            setLoading(true)
            try {
                const countries = await axios.get('https://restcountries.com/v3.1/all')
                // console.log(countries.data)
                setCountries(countries.data.map(country => { return country.name.common }))
            } catch (error) {
                console.error(error)
                navigation.navigate('Add_Id_Card')
            } finally {
                setLoading(false)
            }
        }

        getAllCountries()
    }, [])

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

    const { firstname, surname, middle_name, dob, issue_date, expiry_date, sex, height, blood_group, nin, nationality } = idInformation

    async function uploadCardToDatabase() {


        const heightValid = runCheck('height', height)
        const ninValid = runCheck('nin', nin)
        const bloodGroupValid = runCheck('blood_group', blood_group)
        const nationalityValid = runCheck('nationality', nationality)
        const sexValid = runCheck('sex', sex)
        const middle_nameValid = runCheck('middle_name', middle_name)
        const surnameValid = runCheck('surname', surname)
        const firstnameValid = runCheck('firstname', firstname)

        if (firstnameValid && surnameValid && middle_nameValid && sexValid && nationalityValid && heightValid && ninValid && bloodGroupValid) {

            const { data, error } = await supabase
                .from('id_cards')
                .insert([
                    {
                        user_id: user.id,
                        first_name: firstname,
                        surname: surname,
                        middle_name: middle_name,
                        date_of_birth: dob,
                        nationality: nationality,
                        issue_date: issue_date,
                        expiry_date: expiry_date,
                        sex: sex,
                        blood_group: blood_group,
                        nin: nin,
                        height: height
                    },
                ])
                .select()
            console.log(data, error)
            if (error) {
                setError({ type: 'error', message: error.message })
            } else {
                setError({
                    type: 'success', message: 'Successfully added Card'
                })
                setIdInformation({
                    firstname: '',
                    surname: '',
                    middle_name: '',
                    dob: new Date(),
                    issue_date: new Date(),
                    expiry_date: new Date(),
                    sex: '',
                    height: '',
                    blood_group: '',
                    nin: '',
                    nationality: ''
                })
            }
        }


        setTimeout(() => {
            setError({ type: '', message: '' })
        }, 3000)
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
                                    Add National ID
                                </Text>
                                <View></View>
                            </View>
                            <ScrollView className='mt-8 flex-grow h-full mb-6'>
                                <View>
                                    <View className='flex flex-row gap-4'>
                                        <View className='flex-1'>
                                            <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-sm text-[#1E1E1E]'>First name</Text>
                                            <TextInput
                                                placeholder="Enter First Name"
                                                value={firstname}
                                                style={{ fontFamily: 'Poppins_400Regular' }}
                                                onChangeText={text => setIdInformation((prevInfo) => ({ ...prevInfo, firstname: text }))}
                                                className='bg-transparent rounded-lg border-[1px] mt-2 border-[#E0E0E0] py-3 px-4 focus:border-[1px] focus:border-[#4169E1]'
                                            />
                                        </View>
                                        <View className='flex-1'>
                                            <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-sm text-[#1E1E1E]'>Middle name</Text>
                                            <TextInput
                                                placeholder="Enter Middle Name"
                                                value={middle_name}
                                                style={{ fontFamily: 'Poppins_400Regular' }}
                                                onChangeText={text => setIdInformation((prevInfo) => ({ ...prevInfo, middle_name: text }))}
                                                className='bg-transparent rounded-lg border-[1px] mt-2 border-[#E0E0E0] py-3 px-4 focus:border-[1px] focus:border-[#4169E1]'
                                            />
                                        </View>
                                    </View>
                                    <View className='flex flex-row mt-4'>
                                        <View className='flex-1'>
                                            <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-sm text-[#1E1E1E]'>Surname</Text>
                                            <TextInput
                                                placeholder="Enter Surname"
                                                value={surname}
                                                style={{ fontFamily: 'Poppins_400Regular' }}
                                                onChangeText={text => setIdInformation((prevInfo) => ({ ...prevInfo, surname: text }))}
                                                className='bg-transparent rounded-lg border-[1px] mt-2 border-[#E0E0E0] py-3 px-4 focus:border-[1px] focus:border-[#4169E1]'
                                            />
                                        </View>
                                        <View className='flex-1 ml-4'></View>
                                    </View>
                                </View>

                                <View className='flex-1 mt-8'>
                                    <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-sm text-[#1E1E1E]'>Sex</Text>
                                    <TouchableOpacity onPress={() => setShowSexModal(true)} className='bg-transparent flex flex-row justify-between items-center rounded-lg border-[1px] mt-2 border-[#E0E0E0] py-3 px-4 focus:border-[1px] focus:border-[#4169E1]'>
                                        <Text style={{ fontFamily: 'Poppins_400Regular' }} className={`${sex === '' ? 'text-[#bcbbbb]' : 'text-[#1E1E1E]'}`}>{`${sex === '' ? 'Enter your sex' : `${sex}`}`}</Text>
                                        <Icon
                                            name='down'
                                            size={16}
                                        />
                                    </TouchableOpacity>
                                    <Modal animationType='fade' visible={showSexModal} transparent={true} onRequestClose={() => setShowSexModal(false)}>
                                        <View className='bg-transparent flex-1'>
                                            <TouchableWithoutFeedback onPress={() => setShowSexModal(false)}><View className='flex-1 bg-[#00000080]'></View></TouchableWithoutFeedback>
                                            <View className='bg-white p-8 py-10 rounded-[24px] shadow-lg  absolute bottom-0 w-full'>
                                                <Pressable
                                                    onPress={() => {
                                                        setIdInformation(prevInfo => ({ ...prevInfo, sex: 'Male' }))
                                                        setShowSexModal(false)
                                                    }}
                                                    className='flex flex-row items-center p-4'
                                                >
                                                    <View className='h-[24px] flex items-center p-1 w-[24px] border-[#4169E1] border-[1px] rounded-full'>
                                                        <View className={`h-full w-full rounded-full bg-[#4169E1] ${sex === 'Male' ? '' : 'hidden'}`}></View>
                                                    </View>
                                                    <Text style={{ fontFamily: 'Poppins_400Regular' }} className='ml-4 uppercase'>Male</Text>
                                                </Pressable>
                                                <Pressable
                                                    onPress={() => {
                                                        setIdInformation(prevInfo => ({ ...prevInfo, sex: 'Female' }))
                                                        setShowSexModal(false)
                                                    }}
                                                    className='flex flex-row items-center p-4'
                                                >
                                                    <View className='h-[24px] flex items-center p-1 w-[24px] border-[#4169E1] border-[1px] rounded-full'>
                                                        <View className={`h-full w-full rounded-full bg-[#4169E1] ${sex === 'Female' ? '' : 'hidden'}`}></View>
                                                    </View>
                                                    <Text style={{ fontFamily: 'Poppins_400Regular' }} className='ml-4 uppercase'>Female</Text>
                                                </Pressable>
                                            </View>
                                        </View>
                                    </Modal>
                                </View>

                                <View className='flex-1 mt-8'>
                                    <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-sm text-[#1E1E1E]'>Date of Birth</Text>
                                    <TouchableOpacity onPress={() => setShowDob(true)} className='bg-transparent rounded-lg border-[1px] mt-2 border-[#E0E0E0] py-3 px-4 focus:border-[1px] focus:border-[#4169E1]'>
                                        <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-[#1E1E1E]'>{dob.toLocaleDateString()}</Text>
                                    </TouchableOpacity>
                                    {showDob &&
                                        <RNDateTimePicker
                                            mode='date'
                                            value={dob}
                                            onChange={(e, date) => setIdInformation((prevInfo) => ({ ...prevInfo, dob: date }))}
                                        />
                                    }
                                </View>

                                <View className='flex-1 mt-8'>
                                    <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-sm text-[#1E1E1E]'>Nationality</Text>
                                    <Pressable onPress={() => setShowNationalityModal(true)} className='bg-transparent flex flex-row justify-between items-center rounded-lg border-[1px] mt-2 border-[#E0E0E0] py-3 px-4 focus:border-[1px] focus:border-[#4169E1]'>
                                        <Text style={{ fontFamily: 'Poppins_400Regular' }} className={`${nationality === '' ? 'text-[#bcbbbb]' : 'text-[#1E1E1E]'}`}>{`${nationality === '' ? 'Enter Nationality' : `${nationality}`}`}</Text>
                                        <Icon
                                            name='down'
                                            size={16}
                                        />
                                    </Pressable>
                                    <Modal animationType='fade' visible={showNationalityModal} transparent={true} onRequestClose={() => setShowNationalityModal(false)}>
                                        <View className='bg-transparent flex-1'>
                                            <TouchableWithoutFeedback onPress={() => setShowNationalityModal(false)}><View className='flex-1 bg-[#00000080]'></View></TouchableWithoutFeedback>
                                            <ScrollView className='bg-white p-8 py-10 rounded-[24px] absolute bottom-0 h-[400px] shadow-lg w-full'>
                                                <SafeAreaView className='mb-[80px]'>
                                                    {countries.sort().map((country, index) => {
                                                        return (
                                                            <Pressable
                                                                key={index}
                                                                onPress={() => {
                                                                    setIdInformation(prevInfo => ({ ...prevInfo, nationality: country }))
                                                                    setShowNationalityModal(false)
                                                                }}
                                                                className='flex flex-row items-center p-4'
                                                            >
                                                                <View className='h-[24px] flex items-center p-1 w-[24px] border-[#4169E1] border-[1px] rounded-full'>
                                                                    <View className={`h-full w-full rounded-full bg-[#4169E1] ${nationality === country ? '' : 'hidden'}`}></View>
                                                                </View>
                                                                <Text style={{ fontFamily: 'Poppins_400Regular' }} className='ml-4 uppercase'>{country}</Text>
                                                            </Pressable>
                                                        )
                                                    })}
                                                </SafeAreaView>
                                            </ScrollView>
                                        </View>
                                    </Modal>
                                </View>

                                <View className='flex-1 mt-8'>
                                    <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-sm text-[#1E1E1E]'>Blood Group</Text>
                                    <TextInput
                                        placeholder="Enter blood group"
                                        value={blood_group}
                                        style={{ fontFamily: 'Poppins_400Regular' }}
                                        onChangeText={text => setIdInformation((prevInfo) => ({ ...prevInfo, blood_group: text }))}
                                        className='bg-transparent rounded-lg border-[1px] mt-2 border-[#E0E0E0] py-3 px-4 focus:border-[1px] focus:border-[#4169E1]'
                                    />
                                </View>

                                <View className='flex-1 mt-8'>
                                    <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-sm text-[#1E1E1E]'>Height</Text>
                                    <TextInput
                                        placeholder="Enter height"
                                        value={height}
                                        style={{ fontFamily: 'Poppins_400Regular' }}
                                        onChangeText={text => setIdInformation((prevInfo) => ({ ...prevInfo, height: text }))}
                                        className='bg-transparent rounded-lg border-[1px] mt-2 border-[#E0E0E0] py-3 px-4 focus:border-[1px] focus:border-[#4169E1]'
                                    />
                                </View>

                                <View className='flex-1 mt-8'>
                                    <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-sm text-[#1E1E1E]'>NIN</Text>
                                    <TextInput
                                        placeholder="Enter NIN"
                                        value={nin}
                                        style={{ fontFamily: 'Poppins_400Regular' }}
                                        onChangeText={text => setIdInformation((prevInfo) => ({ ...prevInfo, nin: text }))}
                                        className='bg-transparent rounded-lg border-[1px] mt-2 border-[#E0E0E0] py-3 px-4 focus:border-[1px] focus:border-[#4169E1]'
                                    />
                                </View>

                                <View className='flex-1 mt-8'>
                                    <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-sm text-[#1E1E1E]'>Issue Date</Text>
                                    <TouchableOpacity onPress={() => setShowIssueDate(true)} className='bg-transparent rounded-lg border-[1px] mt-2 border-[#E0E0E0] py-3 px-4 focus:border-[1px] focus:border-[#4169E1]'>
                                        <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-[#1E1E1E]'>{issue_date.toLocaleDateString()}</Text>
                                    </TouchableOpacity>
                                    {showIssueDate &&
                                        <RNDateTimePicker
                                            mode='date'
                                            value={issue_date}
                                            onChange={(e, date) => {
                                                setIdInformation((prevInfo) => ({ ...prevInfo, issue_date: date }))
                                            }}
                                        />
                                    }
                                </View>

                                <View className='flex-1 mt-8'>
                                    <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-sm text-[#1E1E1E]'>Expiry Date</Text>
                                    <TouchableOpacity onPress={() => setShowExpiryDate(true)} className='bg-transparent rounded-lg border-[1px] mt-2 border-[#E0E0E0] py-3 px-4 focus:border-[1px] focus:border-[#4169E1]'>
                                        <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-[#1E1E1E]'>{expiry_date.toLocaleDateString()}</Text>
                                    </TouchableOpacity>
                                    {showExpiryDate &&
                                        <RNDateTimePicker
                                            mode='date'
                                            value={expiry_date}
                                            onChange={(e, date) => {
                                                setIdInformation((prevInfo) => ({ ...prevInfo, expiry_date: date }))
                                            }}
                                        />
                                    }
                                </View>

                            </ScrollView>
                            {error.message !== '' && <Text style={{ fontFamily: 'Poppins_500Medium' }} className={`${error.type === 'error' ? 'text-red-500' : 'text-green-500'} my-4`}>{error.message}</Text>}
                            <TouchableOpacity onPress={uploadCardToDatabase} className='bg-[#4169E1] py-4 mt-auto flex items-center rounded-xl'>
                                <Text style={{ fontFamily: 'Poppins_500Medium' }} className='text-white'>Save Card</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            }
        </View>
    )
}
