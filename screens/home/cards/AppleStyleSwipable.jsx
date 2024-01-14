import React, { useRef, useState } from 'react';
import { Animated, Text, View, Modal, Button, Pressable, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFonts, Poppins_400Regular, Poppins_500Medium } from "@expo-google-fonts/poppins";
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../../../utils/supabase';

const AppleStyleSwipeableRow = ({ children, card, component }) => {
    const swipeableRef = useRef(null);
    const [modalVisibleRight, setModalVisibleRight] = React.useState(false);
    const [loading, setLoading] = useState(false)
    let [fontsLoaded, fontsError] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium
    })

    const renderLeftActions = (progress, dragX) => {

        return (
            <RectButton onPress={() => swipeableRef.current.close()}>
                <Animated.View
                    className='w-full h-full flex-col border-y-[1px] border-[#5C81EE] items-center justify-center p-14'
                >
                    <Icon
                        name='pencil'
                        color='#5C81EE'
                        size={32}
                    />
                    <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-[#5C81EE]'>Edit Card</Text>
                </Animated.View>
            </RectButton>
        );
    };

    const renderRightActions = (progress, dragX) => {

        return (
            <RectButton onPress={() => swipeableRef.current.close()}>
                <Animated.View
                    className='w-full h-full flex-col border-y-[1px] border-[#F84343] items-center justify-center p-14'
                >
                    <Icon
                        name='trash'
                        color='#F84343'
                        size={32}
                    />
                    <Text style={{ fontFamily: 'Poppins_400Regular' }} className='text-[#F84343]'>Delete Card</Text>
                </Animated.View>
            </RectButton>
        );
    };

    const handleSwipeableOpen = (direction) => {
        if (direction === 'right') {
            setModalVisibleRight(true);
        } else if (direction === 'left') {

        }
    };

    const deleteCard = async (id) => {
        if (component === 'id_card') {
            setLoading(true)
            try {
                const { error } = await supabase
                    .from('id_cards')
                    .delete()
                    .eq('id', id)

                if (error) {
                    console.error(error)
                }
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        } else if (component === 'debit_card') {
            setLoading(true)
            try {
                const { error } = await supabase
                    .from('debit_cards')
                    .delete()
                    .eq('id', id)

                if (error) {
                    console.error(error)
                }
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        } else if (component === 'drivers_license') {
            setLoading(true)
            try {
                const { error } = await supabase
                    .from('drivers_licenses')
                    .delete()
                    .eq('id', id)

                if (error) {
                    console.error(error)
                }
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
    }

    if (!fontsLoaded && !fontsError) {
        return null;
    }

    return (
        <Swipeable
            ref={swipeableRef}
            renderLeftActions={renderLeftActions}
            renderRightActions={renderRightActions}
            onSwipeableOpen={(event) => handleSwipeableOpen(event)}
        >
            {children}

            {/* Right Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisibleRight}
                onRequestClose={() => {
                    setModalVisibleRight(false)
                    swipeableRef.current.close()
                }}
                className='flex-1 w-full'
            >
                <View className='flex-1 bg-[#80808090] px-8 items-center justify-center'>
                    <View className='bg-white p-8 w-full rounded-[18px] shadow-lg flex flex-col items-center'>
                        <View className='p-2'>
                            <Icon
                                name='trash'
                                color='#F84343'
                                size={80}
                            />
                        </View>
                        <Text className='px-12 text-center my-6' style={{ fontFamily: 'Poppins_400Regular' }}>Are you sure you want to delete this card?</Text>
                        <View className='flex-row flex w-full items-center'>
                            <Pressable
                                disabled={loading}
                                onPress={() => {
                                    setModalVisibleRight(false)
                                    swipeableRef.current.close()
                                }}
                                className='flex-1 py-4 flex items-center bg-[#4169E1] rounded-xl'
                            >
                                <Text className='text-white' style={{ fontFamily: 'Poppins_500Medium' }}>Cancel</Text>
                            </Pressable>
                            <Pressable
                                disabled={loading}
                                onPress={() => deleteCard(card.id)}
                                className='flex-1 py-4 ml-4 flex items-center bg-[#F84343] rounded-xl'
                            >
                                {loading ? <ActivityIndicator size='small' color='#ffffff' /> : <Text className='text-white' style={{ fontFamily: 'Poppins_500Medium' }}>Delete</Text>}
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </Swipeable>
    );
};

export default AppleStyleSwipeableRow;
