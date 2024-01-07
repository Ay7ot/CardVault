import { Image, ImageBackground, Text, View } from "react-native";

export default function IdComponent({ card }) {

    return (
        <View className='bg-white px-4 py-6 rounded-xl'>
            <ImageBackground source={require('../../../assets/image-57.png')} className='min-h-[300px] flex-col gap-4'>
                <View className='flex-row items-center'>
                    <Image
                        resizeMode='contain'
                        source={require('../../../assets/image-56.png')}
                    />
                    <View className='flex-col gap-1 ml-2'>
                        <Text className='text-green-800'>FEDERAL REPUBLIC OF NIGERIA</Text>
                        <Text className='text-green-800'>NATIONAL RIVERS LICENSE</Text>
                    </View>
                </View>
                <View className='flex-row justify-between'>
                    <View className='flex-row items-center pb-2 border-b-[1px] border-[#dddfe2]'>
                        <Text className='text-blue-500'>L/NO: </Text>
                        <Text className='text-[#1E1E1E]'>{card.license_number}</Text>
                    </View>
                    <View className='flex-row items-center pb-2 border-b-[1px] border-[#dddfe2]'>
                        <Text className='text-blue-500'>Car Type </Text>
                        <Text className='text-[#1E1E1E]'>{card.car_type}</Text>
                    </View>
                </View>
                <View className='flex-row justify-between'>
                    <View className='flex-row items-center pb-2 border-b-[1px] border-[#dddfe2]'>
                        <Text className='text-blue-500'>Name: </Text>
                        <Text className='text-[#1E1E1E]'>{card.full_name}</Text>
                    </View>
                    <View className='flex-row items-center pb-2 border-b-[1px] border-[#dddfe2]'>
                        <Text className='text-blue-500'>D of B: </Text>
                        <Text className='text-[#1E1E1E]'>{card.date_of_birth}</Text>
                    </View>
                </View>
                <View className='flex-row'>
                    <View className='flex-row items-center pb-2 border-b-[1px] flex-wrap border-[#dddfe2]'>
                        <Text className='text-blue-500'>Address: </Text>
                        <Text className='text-[#1E1E1E] '>{card.address}</Text>
                    </View>
                </View>
                <View className='flex-row justify-between'>
                    <View className='flex-row items-center pb-2 border-b-[1px] border-[#dddfe2]'>
                        <Text className='text-blue-500'>Sex: </Text>
                        <Text className='text-[#1E1E1E]'>{card.sex}</Text>
                    </View>
                    <View className='flex-row items-center pb-2 border-b-[1px] border-[#dddfe2]'>
                        <Text className='text-blue-500'>Height: </Text>
                        <Text className='text-[#1E1E1E]'>{card.height}</Text>
                    </View>
                    <View className='flex-row items-center pb-2 border-b-[1px] border-[#dddfe2]'>
                        <Text className='text-blue-500'>Blood Group: </Text>
                        <Text className='text-[#1E1E1E]'>{card.blood_group}</Text>
                    </View>
                </View>
                <View className='flex-row justify-between'>
                    <View className='flex-row items-center pb-2 border-b-[1px] border-[#dddfe2]'>
                        <Text className='text-blue-500'>Date of 1st ISS: </Text>
                        <Text className='text-[#1E1E1E]'>{card.first_issue_date}</Text>
                    </View>
                    <View className='flex-row items-center pb-2 border-b-[1px] border-[#dddfe2]'>
                        <Text className='text-blue-500'>Date of ISS: </Text>
                        <Text className='text-[#1E1E1E]'>{card.issue_date}</Text>
                    </View>
                </View>
                <View className='flex-row justify-between'>
                    <View className='flex-row items-center pb-2 border-b-[1px] border-[#dddfe2]'>
                        <Text className='text-blue-500'>Issuing State: </Text>
                        <Text className='text-[#1E1E1E]'>{card.current_issuing_state}</Text>
                    </View>
                    <View className='flex-row items-center pb-2 border-b-[1px] border-[#dddfe2]'>
                        <Text className='text-blue-500'>1st Issuing State: </Text>
                        <Text className='text-[#1E1E1E]'>{card.first_issuing_state}</Text>
                    </View>
                </View>
                <View className='flex-row justify-between'>
                    <View className='flex-row items-center pb-2 border-b-[1px] border-[#dddfe2]'>
                        <Text className='text-blue-500'>Expiry Date: </Text>
                        <Text className='text-[#1E1E1E]'>{card.expiry_date}</Text>
                    </View>
                </View>
                <View className='flex-row justify-between'>
                    <View className='flex-row items-center pb-2 border-b-[1px] border-[#dddfe2]'>
                        <Text className='text-blue-500'>F/Marks: </Text>
                        <Text className='text-[#1E1E1E]'>{card.facial_marks}</Text>
                    </View>
                    <View className='flex-row justify-between gap-2'>
                        <View className='flex-row items-center pb-2 border-b-[1px] border-[#dddfe2]'>
                            <Text className='text-blue-500'>GL: </Text>
                            <Text className='text-[#1E1E1E]'>{card.glasses}</Text>
                        </View>
                        <View className='flex-row items-center pb-2 border-b-[1px] border-[#dddfe2]'>
                            <Text className='text-blue-500'>REP: </Text>
                            <Text className='text-[#1E1E1E]'>{card.replacements}</Text>
                        </View>
                        <View className='flex-row items-center pb-2 border-b-[1px] border-[#dddfe2]'>
                            <Text className='text-blue-500'>REN: </Text>
                            <Text className='text-[#1E1E1E]'>{card.renewals}</Text>
                        </View>
                    </View>
                </View>
                <View className='flex-row justify-between'>
                    <View className='flex-row items-center pb-2 border-b-[1px] border-[#dddfe2]'>
                        <Text className='text-blue-500'>END: </Text>
                        <Text className='text-[#1E1E1E]'>{card.endorsments}</Text>
                    </View>
                    <View className='flex-row items-center pb-2 border-b-[1px] border-[#dddfe2]'>
                        <Text className='text-blue-500'>N of K: </Text>
                        <Text className='text-[#1E1E1E]'>{card.next_of_kin_number}</Text>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}
