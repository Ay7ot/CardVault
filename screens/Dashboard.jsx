import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './home/Home';
import Settings from './settings/Settings';
import Profile from './profile/Profile';

const Tab = createBottomTabNavigator()

export default function Dashboard() {

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'home'
                            : 'home-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#4169E1',
                tabBarInactiveTintColor: 'gray',
            })}

        >
            <Tab.Screen name='Home' component={Home} options={{ headerShown: false, gestureEnabled: false }} />
            <Tab.Screen name='Settings' component={Settings} options={{ headerShown: false, gestureEnabled: false }} />
            <Tab.Screen name='Profile' component={Profile} options={{ headerShown: false, gestureEnabled: false }} />
        </Tab.Navigator>
    );
};
