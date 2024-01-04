import React, { useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const AppleStyleSwipeableRow = ({ children, card, component }) => {
    const swipeableRef = useRef(null);

    const renderLeftActions = (progress, dragX) => {
        const trans = dragX.interpolate({
            inputRange: [0, 50, 100, 101],
            outputRange: [-20, 0, 0, 1],
        });
        return (
            <RectButton
                style={styles.leftAction}
                onPress={() => swipeableRef.current.close()}
            >
                <Animated.View
                    style={[
                        styles.actionText,
                        {
                            transform: [{ translateX: trans }],
                        },
                    ]}
                >
                    <Text>{card.id}</Text>
                </Animated.View>
            </RectButton>
        );
    };

    return (
        <Swipeable
            ref={swipeableRef}
            renderLeftActions={renderLeftActions}
        >
            {children}
        </Swipeable>
    );
};

const styles = StyleSheet.create({
    leftAction: {
        flex: 1,
        backgroundColor: '#388e3c',
        justifyContent: 'center',
    },
    actionText: {
        color: 'white',
        fontSize: 16,
        padding: 10,
    },
});

export default AppleStyleSwipeableRow;
