import { Image, ImageBackground, Text, View } from "react-native";

export default function IdComponent({ card }) {
    
    return (
        <View className='bg-white px-6 py-4 rounded-xl'>
            <ImageBackground source={require('../../../assets/image-57.png')} className='min-h-[300px]'>
                <View className='flex flex-row gap-4 items-center'>
                    <Image
                        source={require('../../../assets/coat-of-arms.png')}
                    />
                    <View className='flex flex-col'>
                        <Text className='font-semibold text-green-700'>FEDERAL REPUBLIC OF NIGERIA</Text>
                        <Text className='font-semibold text-green-700'>NATIONAL IDENTITY CARD</Text>
                    </View>
                </View>
                <View className='mt-8'>
                    <View className='flex flex-row justify-between mb-4'>
                        <View className='flex items-center flex-row border-b-[1px] border-b-[#c3c3c3] pb-2'>
                            <Text className='text-blue-500'>FIRST NAME:</Text>
                            <Text className='text-[#1E1E1E]'>{card.first_name.toUpperCase()}</Text>
                        </View>
                        <View className='flex items-center flex-row border-b-[1px] border-b-[#c3c3c3] pb-2'>
                            <Text className='text-blue-500'>SURNAME:</Text>
                            <Text className='text-[#1E1E1E]'>{card.surname.toUpperCase()}</Text>
                        </View>
                    </View>
                    <View className='flex flex-row justify-between mb-4'>
                        <View className='flex items-center flex-row border-b-[1px] border-b-[#c3c3c3] pb-2'>
                            <Text className='text-blue-500'>MIDDLE NAME:</Text>
                            <Text className='text-[#1E1E1E]'>{card.middle_name.toUpperCase()}</Text>
                        </View>
                        <View className='flex items-center flex-row border-b-[1px] border-b-[#c3c3c3] pb-2'>
                            <Text className='text-blue-500'>D.O.B:</Text>
                            <Text className='text-[#1E1E1E]'>{card.date_of_birth}</Text>
                        </View>
                    </View>
                    <View className='flex flex-row justify-between mb-4'>
                        <View className='flex items-center flex-row border-b-[1px] border-b-[#c3c3c3] pb-2'>
                            <Text className='text-blue-500'>ISSUE DATE:</Text>
                            <Text className='text-[#1E1E1E]'>{card.issue_date}</Text>
                        </View>
                        <View className='flex items-center flex-row border-b-[1px] border-b-[#c3c3c3] pb-2'>
                            <Text className='text-blue-500'>EXPIRY DATE:</Text>
                            <Text className='text-[#1E1E1E]'>{card.expiry_date}</Text>
                        </View>
                    </View>
                    <View className='flex flex-row justify-between mb-4'>
                        <View className='flex items-center flex-row border-b-[1px] border-b-[#c3c3c3] pb-2'>
                            <Text className='text-blue-500'>SEX:</Text>
                            <Text className='text-[#1E1E1E]'>{card.sex.toUpperCase()}</Text>
                        </View>
                        <View className='flex items-center flex-row border-b-[1px] border-b-[#c3c3c3] pb-2'>
                            <Text className='text-blue-500'>HEIGHT:</Text>
                            <Text className='text-[#1E1E1E]'>{card.height}</Text>
                        </View>
                        <View className='flex items-center flex-row border-b-[1px] border-b-[#c3c3c3] pb-2'>
                            <Text className='text-blue-500'>BLOOD GROUP:</Text>
                            <Text className='text-[#1E1E1E]'>{card.blood_group}</Text>
                        </View>
                    </View>
                    <View className='flex flex-row justify-between mb-4'>
                        <View className='flex items-center flex-row border-b-[1px] border-b-[#c3c3c3] pb-2'>
                            <Text className='text-blue-500'>NIN:</Text>
                            <Text className='text-[#1E1E1E]'>{card.nin}</Text>
                        </View>
                        <View className='flex items-center flex-row border-b-[1px] border-b-[#c3c3c3] pb-2'>
                            <Text className='text-blue-500'>NATIONALITY:</Text>
                            <Text className='text-[#1E1E1E]'>{card.nationality.toUpperCase()}</Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}
