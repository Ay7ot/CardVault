import { useEffect, useState } from "react";
import LoadPage from "./LoadPage";
import WelcomePage from "./auth/WelcomePage";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import ResetPassword from "./auth/ResetPassword";
import Dashboard from "./Dashboard";
import Onboarding1 from "./onboarding/Onboarding1";
import Onboarding2 from "./onboarding/Onboarding2";
import Onboarding3 from "./onboarding/Onboarding3";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useGeneralAppContext } from "../utils/useGeneralAppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddIdCard from "./home/cards/AddIdCard";
import AddDebitCard from "./home/cards/AddDebitCard";
import AddDriversLicense from "./home/cards/AddDriversLicense";

const Stack = createNativeStackNavigator();

export default function Navigation() {

    const { session, user, isNewUser } = useGeneralAppContext()
    const [loading, setLoading] = useState(true)
    const [isUserAllowed, setIsUserAllowed] = useState(false)

    const expirationTime = session?.expires_at;
    const currentTimestamp = Math.floor(Date.now() / 1000); // Current timestamp in seconds

    const hasExpired = currentTimestamp >= expirationTime;

    useEffect(() => {

        // async function removeUserInfo() {
        //     try {
        //         await AsyncStorage.removeItem('user');
        //     } catch (error) {
        //         console.error(error)
        //     }
        // }

        async function getUserInfo() {
            if (session && !hasExpired) {
                setLoading(true)
                setTimeout(() => {
                    setIsUserAllowed(true);
                    setLoading(false)
                }, 2000)
            } else {
                setIsUserAllowed(false)
                setLoading(false)
            }
        }

        getUserInfo()
    }, [session, user])

    if (loading) {
        return <LoadPage />
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isUserAllowed === false ?
                    (<>
                        <Stack.Screen
                            name="Welcome"
                            component={WelcomePage}
                            options={{ headerShown: false, gestureEnabled: false }}
                        />
                        <Stack.Screen
                            name="Signup"
                            component={Signup}
                            options={{ headerShown: false, gestureEnabled: false }}
                        />
                        <Stack.Screen
                            name="Login"
                            component={Login}
                            options={{ headerShown: false, gestureEnabled: false }}
                        />
                        <Stack.Screen
                            name="ResetPassword"
                            component={ResetPassword}
                            options={{ headerShown: false, gestureEnabled: false }}
                        />
                    </>)
                    :
                    (<>
                        {isNewUser ?
                            <>
                                <Stack.Screen
                                    name="Onboarding1"
                                    component={Onboarding1}
                                    options={{ headerShown: false, gestureEnabled: false }}
                                />
                                <Stack.Screen
                                    name="Dashboard"
                                    component={Dashboard}
                                    options={{ headerShown: false, gestureEnabled: false }}
                                />
                            </> :
                            <>
                                <Stack.Screen
                                    name="Dashboard"
                                    component={Dashboard}
                                    options={{ headerShown: false, gestureEnabled: false }}
                                />
                                <Stack.Screen
                                    name="Onboarding1"
                                    component={Onboarding1}
                                    options={{ headerShown: false, gestureEnabled: false }}
                                />
                            </>
                        }
                        <Stack.Screen
                            name="Onboarding2"
                            component={Onboarding2}
                            options={{ headerShown: false, gestureEnabled: false }}
                        />
                        <Stack.Screen
                            name="Onboarding3"
                            component={Onboarding3}
                            options={{ headerShown: false, gestureEnabled: false }}
                        />
                        <Stack.Screen
                            name="Add_Id_Card"
                            component={AddIdCard}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="Add_Debit_Card"
                            component={AddDebitCard}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="Add_Drivers_License"
                            component={AddDriversLicense}
                            options={{ headerShown: false }}
                        />
                    </>)
                }

            </Stack.Navigator>
        </NavigationContainer>
    )
}