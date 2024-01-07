import { useNavigation } from '@react-navigation/native'
import { useFonts, Poppins_400Regular, Poppins_500Medium } from "@expo-google-fonts/poppins";
import { View, SafeAreaView, Text, TouchableOpacity, ScrollView, ActivityIndicator, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Modal, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import { useEffect, useState } from 'react';
import axios from 'axios';
import statesData from '../../../assets/states.json'
import RNDateTimePicker from '@react-native-community/datetimepicker';
import SuccessfulModal from './SuccessfulModal';
import { supabase } from '../../../utils/supabase';

export default function AddDriversLicense() {

    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    let [fontsLoaded, fontsError] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium
    })
    const [showSuccessful, setShowSuccessful] = useState(false)
    const [loading, setLoading] = useState(false)
    const [states, setStates] = useState([])
    const [addCardLoadState, setAddCardLoadState] = useState(false)
    const navigation = useNavigation()
    const [showCurrentIssuingState, setShowCurrentIssuingState] = useState(false)
    const [showFirstIssuingState, setShowFirstIssuingState] = useState(false)
    const [showSexModal, setShowSexModal] = useState(false)
    const [showBloodGroupModal, setShowBloodGroupModal] = useState(false)
    const [showDob, setShowDob] = useState(false)
    const [showExpiryDate, setShowExpiryDate] = useState(false)
    const [showIssueDate, setShowIssueDate] = useState(false)
    const [showFirstIssueDate, setShowFirstIssueDate] = useState(false)
    const [error, setError] = useState({ type: '', message: '' })
    const [licenseInformation, setLicenseInformation] = useState({
        full_name: '',
        sex: '',
        dob: new Date(),
        address: '',
        height: '',
        blood_group: '',
        expiry_date: new Date(),
        issue_date: new Date(),
        first_issue_date: new Date(),
        first_issuing_state: '',
        current_issuing_state: '',
        license_number: '',
        next_of_kin_number: '',
        facial_marks: '',
        glasses: '',
        car_type: '',
        renewals: '',
        replacements: '',
        license_class: '',
        endorsments: ''
    })

    useEffect(() => {

        async function getStates() {
            setLoading(true)
            try {
                setStates(Object.keys(statesData))
            } catch (error) {
                console.error(error)
                navigation.navigate('Add_Drivers_License')
            } finally {
                setLoading(false)
            }
        }

        getStates()
    }, [])

    function capitalizeWords(str) {
        return str.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    function runCheck(valuesToCheck) {
        for (const value in valuesToCheck) {
            if (valuesToCheck.hasOwnProperty(value)) {
                const name = valuesToCheck[value];

                if (name === '') {
                    setError({
                        type: 'error',
                        message: `${capitalizeWords(value)} cannot be empty`
                    });
                    return false;
                }
            }
        }
        return true;
    }

    const { license_number, car_type, full_name, dob, address, sex, height, blood_group, first_issue_date, issue_date, first_issuing_state, license_class, current_issuing_state, expiry_date, facial_marks, glasses, replacements, renewals, endorsments, next_of_kin_number } = licenseInformation

    async function uploadCardToDatabase() {
        runCheck(licenseInformation)

        if (runCheck(licenseInformation)) {
            setAddCardLoadState(true)
            try {

                const { data, error } = await supabase
                    .from('drivers_licenses')
                    .insert([
                        {
                            full_name: full_name,
                            sex: sex,
                            date_of_birth: dob,
                            address: address,
                            height: height,
                            blood_group: blood_group,
                            issue_date: issue_date,
                            expiry_date: expiry_date,
                            first_issue_date: first_issue_date,
                            current_issuing_state: current_issuing_state,
                            first_issuing_state: first_issuing_state,
                            license_number: license_number,
                            next_of_kin_number: next_of_kin_number,
                            facial_marks: facial_marks,
                            glasses: glasses,
                            car_type: car_type,
                            class: license_class,
                            renewals: renewals,
                            replacements: replacements,
                            endorsments: endorsments
                        }
                    ])
                    .select()

                if (error) {
                    setError({ type: 'error', message: error.message })
                } else {
                    setShowSuccessful(true)
                }
            } catch (error) {
                setError({ type: 'error', message: error.message })
            } finally {
                setAddCardLoadState(false)
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
                                    Add Drivers License
                                </Text>
                                <View></View>
                            </View>
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                className='mt-8 flex-grow h-full mb-6'
                            >
                                <View className='flex-1'>
                                    <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-sm text-[#1E1E1E]'>Full Name</Text>
                                    <TextInput
                                        placeholder="Enter name on license"
                                        value={full_name}
                                        style={{ fontFamily: 'Poppins_400Regular' }}
                                        onChangeText={text => setLicenseInformation((prevInfo) => ({ ...prevInfo, full_name: text }))}
                                        className='bg-transparent rounded-lg border-[1px] mt-2 border-[#E0E0E0] py-3 px-4 focus:border-[1px] focus:border-[#4169E1]'
                                    />
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
                                                        setLicenseInformation(prevInfo => ({ ...prevInfo, sex: 'Male' }))
                                                        setShowSexModal(false)
                                                    }}
                                                    className={`flex flex-row items-center p-4 ${sex === 'Male' ? 'bg-blue-300/20 rounded-xl' : ''}`}
                                                >
                                                    <View className='h-[24px] flex items-center p-1 w-[24px] border-[#4169E1] border-[1px] rounded-full'>
                                                        <View className={`h-full w-full rounded-full bg-[#4169E1] ${sex === 'Male' ? '' : 'hidden'}`}></View>
                                                    </View>
                                                    <Text style={{ fontFamily: 'Poppins_400Regular' }} className='ml-4 uppercase'>Male</Text>
                                                </Pressable>
                                                <Pressable
                                                    onPress={() => {
                                                        setLicenseInformation(prevInfo => ({ ...prevInfo, sex: 'Female' }))
                                                        setShowSexModal(false)
                                                    }}
                                                    className={`flex flex-row items-center p-4 ${sex === 'Female' ? 'bg-blue-300/20 rounded-xl' : ''}`}
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
                                            onChange={(e, date) => setLicenseInformation((prevInfo) => ({ ...prevInfo, dob: date }))}
                                        />
                                    }
                                </View>

                                <View className='flex-1 mt-8'>
                                    <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-sm text-[#1E1E1E]'>Address</Text>
                                    <TextInput
                                        placeholder="Enter your address"
                                        value={address}
                                        multiline={true}
                                        style={{ fontFamily: 'Poppins_400Regular' }}
                                        onChangeText={text => setLicenseInformation((prevInfo) => ({ ...prevInfo, address: text }))}
                                        className='bg-transparent rounded-lg border-[1px] mt-2 border-[#E0E0E0] py-3 px-4 focus:border-[1px] focus:border-[#4169E1] min-h-[100px]'
                                    />
                                </View>

                                <View className='flex-1 mt-8'>
                                    <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-sm text-[#1E1E1E]'>Height</Text>
                                    <TextInput
                                        placeholder="Enter height"
                                        value={height}
                                        style={{ fontFamily: 'Poppins_400Regular' }}
                                        keyboardType='decimal-pad'
                                        onChangeText={text => setLicenseInformation((prevInfo) => ({ ...prevInfo, height: text }))}
                                        className='bg-transparent rounded-lg border-[1px] mt-2 border-[#E0E0E0] py-3 px-4 focus:border-[1px] focus:border-[#4169E1]'
                                    />
                                </View>

                                <View className='flex-1 mt-8'>
                                    <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-sm text-[#1E1E1E]'>Blood Group</Text>
                                    <TouchableOpacity onPress={() => setShowBloodGroupModal(true)} className='bg-transparent flex flex-row justify-between items-center rounded-lg border-[1px] mt-2 border-[#E0E0E0] py-3 px-4 focus:border-[1px] focus:border-[#4169E1]'>
                                        <Text style={{ fontFamily: 'Poppins_400Regular' }} className={`${blood_group === '' ? 'text-[#bcbbbb]' : 'text-[#1E1E1E]'}`}>{`${blood_group === '' ? 'Choose blood group' : `${blood_group}`}`}</Text>
                                        <Icon
                                            name='down'
                                            size={16}
                                        />
                                    </TouchableOpacity>
                                    <Modal animationType='slide' visible={showBloodGroupModal} transparent={true} onRequestClose={() => setShowBloodGroupModal(false)}>
                                        <View className='bg-transparent flex-1'>
                                            <TouchableWithoutFeedback onPress={() => setShowBloodGroupModal(false)}><View className='flex-1 bg-[#00000080]'></View></TouchableWithoutFeedback>
                                            <ScrollView showsVerticalScrollIndicator={false} className='bg-white p-8 py-10 rounded-[24px] absolute bottom-0 h-[400px] shadow-lg w-full'>
                                                <SafeAreaView className='mb-[80px]'>
                                                    {bloodGroups.map((bloodGroup, index) => {
                                                        return (
                                                            <Pressable
                                                                key={index}
                                                                onPress={() => {
                                                                    setLicenseInformation(prevInfo => ({ ...prevInfo, blood_group: bloodGroup }))
                                                                    setShowBloodGroupModal(false)
                                                                }}
                                                                className={`flex flex-row items-center p-4 ${blood_group === bloodGroup ? 'bg-blue-300/20 rounded-xl' : ''}`}
                                                            >
                                                                <View className='h-[24px] flex items-center p-1 w-[24px] border-[#4169E1] border-[1px] rounded-full'>
                                                                    <View className={`h-full w-full rounded-full bg-[#4169E1] ${blood_group === bloodGroup ? '' : 'hidden'}`}></View>
                                                                </View>
                                                                <Text style={{ fontFamily: 'Poppins_400Regular' }} className='ml-4 uppercase'>{bloodGroup}</Text>
                                                            </Pressable>
                                                        )
                                                    })}
                                                </SafeAreaView>
                                            </ScrollView>
                                        </View>
                                    </Modal>
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
                                            onChange={(e, date) => setLicenseInformation((prevInfo) => ({ ...prevInfo, issue_date: date }))}
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
                                            onChange={(e, date) => setLicenseInformation((prevInfo) => ({ ...prevInfo, expiry_date: date }))}
                                        />
                                    }
                                </View>

                                <View className='flex-1 mt-8'>
                                    <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-sm text-[#1E1E1E]'>First Issue Date</Text>
                                    <TouchableOpacity onPress={() => setShowFirstIssueDate(true)} className='bg-transparent rounded-lg border-[1px] mt-2 border-[#E0E0E0] py-3 px-4 focus:border-[1px] focus:border-[#4169E1]'>
                                        <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-[#1E1E1E]'>{first_issue_date.toLocaleDateString()}</Text>
                                    </TouchableOpacity>
                                    {showFirstIssueDate &&
                                        <RNDateTimePicker
                                            mode='date'
                                            value={first_issue_date}
                                            onChange={(e, date) => setLicenseInformation((prevInfo) => ({ ...prevInfo, first_issue_date: date }))}
                                        />
                                    }
                                </View>

                                <View className='flex-1 mt-8'>
                                    <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-sm text-[#1E1E1E]'>Current Issuing state</Text>
                                    <TouchableOpacity onPress={() => setShowCurrentIssuingState(true)} className='bg-transparent flex flex-row justify-between items-center rounded-lg border-[1px] mt-2 border-[#E0E0E0] py-3 px-4 focus:border-[1px] focus:border-[#4169E1]'>
                                        <Text style={{ fontFamily: 'Poppins_400Regular' }} className={`${current_issuing_state === '' ? 'text-[#bcbbbb]' : 'text-[#1E1E1E]'}`}>{`${current_issuing_state === '' ? 'Choose state' : `${current_issuing_state}`}`}</Text>
                                        <Icon
                                            name='down'
                                            size={16}
                                        />
                                    </TouchableOpacity>
                                    <Modal animationType='slide' visible={showCurrentIssuingState} transparent={true} onRequestClose={() => setShowCurrentIssuingState(false)}>
                                        <View className='bg-transparent flex-1'>
                                            <TouchableWithoutFeedback onPress={() => setShowCurrentIssuingState(false)}><View className='flex-1 bg-[#00000080]'></View></TouchableWithoutFeedback>
                                            <ScrollView showsVerticalScrollIndicator={false} className='bg-white p-8 py-10 rounded-[24px] absolute bottom-0 h-[400px] shadow-lg w-full'>
                                                <SafeAreaView className='mb-[80px]'>
                                                    {states.map((state, index) => {
                                                        return (
                                                            <Pressable
                                                                key={index}
                                                                onPress={() => {
                                                                    setLicenseInformation(prevInfo => ({ ...prevInfo, current_issuing_state: state }))
                                                                    setShowCurrentIssuingState(false)
                                                                }}
                                                                className={`flex flex-row items-center p-4 ${current_issuing_state === state ? 'bg-blue-300/20 rounded-xl' : ''}`}
                                                            >
                                                                <View className='h-[24px] flex items-center p-1 w-[24px] border-[#4169E1] border-[1px] rounded-full'>
                                                                    <View className={`h-full w-full rounded-full bg-[#4169E1] ${current_issuing_state === state ? '' : 'hidden'}`}></View>
                                                                </View>
                                                                <Text style={{ fontFamily: 'Poppins_400Regular' }} className='ml-4 uppercase'>{state}</Text>
                                                            </Pressable>
                                                        )
                                                    })}
                                                </SafeAreaView>
                                            </ScrollView>
                                        </View>
                                    </Modal>
                                </View>

                                <View className='flex-1 mt-8'>
                                    <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-sm text-[#1E1E1E]'>First Issuing state</Text>
                                    <TouchableOpacity onPress={() => setShowFirstIssuingState(true)} className='bg-transparent flex flex-row justify-between items-center rounded-lg border-[1px] mt-2 border-[#E0E0E0] py-3 px-4 focus:border-[1px] focus:border-[#4169E1]'>
                                        <Text style={{ fontFamily: 'Poppins_400Regular' }} className={`${first_issuing_state === '' ? 'text-[#bcbbbb]' : 'text-[#1E1E1E]'}`}>{`${first_issuing_state === '' ? 'Choose state' : `${first_issuing_state}`}`}</Text>
                                        <Icon
                                            name='down'
                                            size={16}
                                        />
                                    </TouchableOpacity>
                                    <Modal animationType='slide' visible={showFirstIssuingState} transparent={true} onRequestClose={() => setShowFirstIssuingState(false)}>
                                        <View className='bg-transparent flex-1'>
                                            <TouchableWithoutFeedback onPress={() => setShowFirstIssuingState(false)}><View className='flex-1 bg-[#00000080]'></View></TouchableWithoutFeedback>
                                            <ScrollView showsVerticalScrollIndicator={false} className='bg-white p-8 py-10 rounded-[24px] absolute bottom-0 h-[400px] shadow-lg w-full'>
                                                <SafeAreaView className='mb-[80px]'>
                                                    {states.map((state, index) => {
                                                        return (
                                                            <Pressable
                                                                key={index}
                                                                onPress={() => {
                                                                    setLicenseInformation(prevInfo => ({ ...prevInfo, first_issuing_state: state }))
                                                                    setShowFirstIssuingState(false)
                                                                }}
                                                                className={`flex flex-row items-center p-4 ${first_issuing_state === state ? 'bg-blue-300/20 rounded-xl' : ''}`}
                                                            >
                                                                <View className='h-[24px] flex items-center p-1 w-[24px] border-[#4169E1] border-[1px] rounded-full'>
                                                                    <View className={`h-full w-full rounded-full bg-[#4169E1] ${first_issuing_state === state ? '' : 'hidden'}`}></View>
                                                                </View>
                                                                <Text style={{ fontFamily: 'Poppins_400Regular' }} className='ml-4 uppercase'>{state}</Text>
                                                            </Pressable>
                                                        )
                                                    })}
                                                </SafeAreaView>
                                            </ScrollView>
                                        </View>
                                    </Modal>
                                </View>

                                <View className='flex-1 mt-8'>
                                    <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-sm text-[#1E1E1E]'>License Number (L/NO)</Text>
                                    <TextInput
                                        placeholder="Enter license number"
                                        value={license_number}
                                        style={{ fontFamily: 'Poppins_400Regular' }}
                                        onChangeText={text => setLicenseInformation((prevInfo) => ({ ...prevInfo, license_number: text }))}
                                        className='bg-transparent rounded-lg border-[1px] mt-2 border-[#E0E0E0] py-3 px-4 focus:border-[1px] focus:border-[#4169E1]'
                                    />
                                </View>

                                <View className='flex-1 mt-8'>
                                    <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-sm text-[#1E1E1E]'>Next of Kin Phone Number</Text>
                                    <TextInput
                                        placeholder="Enter next of kin number"
                                        value={next_of_kin_number}
                                        style={{ fontFamily: 'Poppins_400Regular' }}
                                        keyboardType='phone-pad'
                                        onChangeText={text => setLicenseInformation((prevInfo) => ({ ...prevInfo, next_of_kin_number: text }))}
                                        className='bg-transparent rounded-lg border-[1px] mt-2 border-[#E0E0E0] py-3 px-4 focus:border-[1px] focus:border-[#4169E1]'
                                    />
                                </View>

                                <View className='flex-1 mt-8'>
                                    <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-sm text-[#1E1E1E] mb-4'>Facial Marks</Text>
                                    <View className='flex-row gap-8'>
                                        <Pressable
                                            onPress={() => {
                                                setLicenseInformation(prevInfo => ({ ...prevInfo, facial_marks: 'Y' }))
                                            }}
                                            className={`flex flex-row items-center`}
                                        >
                                            <View className='h-[24px] flex items-center p-1 w-[24px] border-[#4169E1] border-[1px] rounded-full'>
                                                <View className={`h-full w-full rounded-full bg-[#4169E1] ${facial_marks === 'Y' ? '' : 'hidden'}`}></View>
                                            </View>
                                            <Text style={{ fontFamily: 'Poppins_400Regular' }} className='ml-4'>Yes</Text>
                                        </Pressable>
                                        <Pressable
                                            onPress={() => {
                                                setLicenseInformation(prevInfo => ({ ...prevInfo, facial_marks: 'N' }))
                                            }}
                                            className={`flex flex-row items-center`}
                                        >
                                            <View className='h-[24px] flex items-center p-1 w-[24px] border-[#4169E1] border-[1px] rounded-full'>
                                                <View className={`h-full w-full rounded-full bg-[#4169E1] ${facial_marks === 'N' ? '' : 'hidden'}`}></View>
                                            </View>
                                            <Text style={{ fontFamily: 'Poppins_400Regular' }} className='ml-4'>No</Text>
                                        </Pressable>
                                    </View>
                                </View>

                                <View className='flex-1 mt-8'>
                                    <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-sm text-[#1E1E1E] mb-4'>Glasses</Text>
                                    <View className='flex-row gap-8'>
                                        <Pressable
                                            onPress={() => {
                                                setLicenseInformation(prevInfo => ({ ...prevInfo, glasses: 'Y' }))
                                            }}
                                            className={`flex flex-row items-center`}
                                        >
                                            <View className='h-[24px] flex items-center p-1 w-[24px] border-[#4169E1] border-[1px] rounded-full'>
                                                <View className={`h-full w-full rounded-full bg-[#4169E1] ${glasses === 'Y' ? '' : 'hidden'}`}></View>
                                            </View>
                                            <Text style={{ fontFamily: 'Poppins_400Regular' }} className='ml-4'>Yes</Text>
                                        </Pressable>
                                        <Pressable
                                            onPress={() => {
                                                setLicenseInformation(prevInfo => ({ ...prevInfo, glasses: 'N' }))
                                            }}
                                            className={`flex flex-row items-center`}
                                        >
                                            <View className='h-[24px] flex items-center p-1 w-[24px] border-[#4169E1] border-[1px] rounded-full'>
                                                <View className={`h-full w-full rounded-full bg-[#4169E1] ${glasses === 'N' ? '' : 'hidden'}`}></View>
                                            </View>
                                            <Text style={{ fontFamily: 'Poppins_400Regular' }} className='ml-4'>No</Text>
                                        </Pressable>
                                    </View>
                                </View>

                                <View className='flex-1 mt-8'>
                                    <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-sm text-[#1E1E1E] mb-4'>Type of car</Text>
                                    <View className='flex-row gap-8'>
                                        <Pressable
                                            onPress={() => {
                                                setLicenseInformation(prevInfo => ({ ...prevInfo, car_type: 'Private' }))
                                            }}
                                            className={`flex flex-row items-center`}
                                        >
                                            <View className='h-[24px] flex items-center p-1 w-[24px] border-[#4169E1] border-[1px] rounded-full'>
                                                <View className={`h-full w-full rounded-full bg-[#4169E1] ${car_type === 'Private' ? '' : 'hidden'}`}></View>
                                            </View>
                                            <Text style={{ fontFamily: 'Poppins_400Regular' }} className='ml-4'>Private</Text>
                                        </Pressable>
                                        <Pressable
                                            onPress={() => {
                                                setLicenseInformation(prevInfo => ({ ...prevInfo, car_type: 'Commercial' }))
                                            }}
                                            className={`flex flex-row items-center`}
                                        >
                                            <View className='h-[24px] flex items-center p-1 w-[24px] border-[#4169E1] border-[1px] rounded-full'>
                                                <View className={`h-full w-full rounded-full bg-[#4169E1] ${car_type === 'Commercial' ? '' : 'hidden'}`}></View>
                                            </View>
                                            <Text style={{ fontFamily: 'Poppins_400Regular' }} className='ml-4'>Commercial</Text>
                                        </Pressable>
                                    </View>
                                </View>

                                <View className='flex-1 mt-8'>
                                    <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-sm text-[#1E1E1E]'>Class (A-J)</Text>
                                    <TextInput
                                        placeholder="Enter class on license"
                                        value={license_class}
                                        style={{ fontFamily: 'Poppins_400Regular' }}
                                        onChangeText={text => setLicenseInformation((prevInfo) => ({ ...prevInfo, license_class: text }))}
                                        className='bg-transparent rounded-lg border-[1px] mt-2 border-[#E0E0E0] py-3 px-4 focus:border-[1px] focus:border-[#4169E1]'
                                    />
                                </View>

                                <View className='flex-1 mt-8'>
                                    <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-sm text-[#1E1E1E]'>Number of Renewals (REN)</Text>
                                    <TextInput
                                        placeholder="Enter renewals on license"
                                        value={renewals}
                                        style={{ fontFamily: 'Poppins_400Regular' }}
                                        keyboardType='numeric'
                                        onChangeText={text => setLicenseInformation((prevInfo) => ({ ...prevInfo, renewals: text }))}
                                        className='bg-transparent rounded-lg border-[1px] mt-2 border-[#E0E0E0] py-3 px-4 focus:border-[1px] focus:border-[#4169E1]'
                                    />
                                </View>

                                <View className='flex-1 mt-8'>
                                    <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-sm text-[#1E1E1E]'>Number of Replacements (REP)</Text>
                                    <TextInput
                                        placeholder="Enter replacements on license"
                                        value={replacements}
                                        style={{ fontFamily: 'Poppins_400Regular' }}
                                        keyboardType='numeric'
                                        onChangeText={text => setLicenseInformation((prevInfo) => ({ ...prevInfo, replacements: text }))}
                                        className='bg-transparent rounded-lg border-[1px] mt-2 border-[#E0E0E0] py-3 px-4 focus:border-[1px] focus:border-[#4169E1]'
                                    />
                                </View>

                                <View className='flex-1 mt-8'>
                                    <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-sm text-[#1E1E1E]'>Endorsments</Text>
                                    <TextInput
                                        placeholder="Enter endorsments on license"
                                        value={endorsments}
                                        style={{ fontFamily: 'Poppins_400Regular' }}
                                        onChangeText={text => setLicenseInformation((prevInfo) => ({ ...prevInfo, endorsments: text }))}
                                        className='bg-transparent rounded-lg border-[1px] mt-2 border-[#E0E0E0] py-3 px-4 focus:border-[1px] focus:border-[#4169E1]'
                                    />
                                </View>

                            </ScrollView>
                            {error.message !== '' && <Text style={{ fontFamily: 'Poppins_500Medium' }} className={`${error.type === 'error' ? 'text-red-500' : 'text-green-500'} my-4`}>{error.message}</Text>}
                            <TouchableOpacity onPress={uploadCardToDatabase} className='bg-[#4169E1] py-4 mt-auto flex items-center rounded-xl'>
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
