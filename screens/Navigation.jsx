import { useEffect, useState } from "react";
import LoadPage from "./LoadPage";
import WelcomePage from "./WelcomePage";
import Signup from "./Signup";
import Login from "./Login";
import ResetPassword from "./ResetPassword";
import Dashboard from "./Dashboard";
import Onboarding1 from "./Onboarding1";
import Onboarding2 from "./Onboarding2";
import Onboarding3 from "./Onboarding3";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useGeneralAppContext } from "../utils/useGeneralAppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

export default function Navigation() {

    const { session, user, isNewUser } = useGeneralAppContext()

    const [loading, setLoading] = useState(true)
    const [isUserAllowed, setIsUserAllowed] = useState(false)

    useEffect(() => {
        const expirationTime = session?.expires_at;
        const currentTimestamp = Math.floor(Date.now() / 1000); // Current timestamp in seconds

        const hasExpired = currentTimestamp >= expirationTime;
        console.log(currentTimestamp, expirationTime)

        async function removeUserInfo() {
            try {
                await AsyncStorage.removeItem('user');
            } catch (error) {
                console.error(error)
            }
        }

        async function getUserInfo() {
            if (session && !hasExpired) {
                setTimeout(() => {
                    setIsUserAllowed(true);
                    setLoading(false)
                }, 3000)
            } else {
                try {
                    removeUserInfo()
                } catch (error) {
                    console.error(error)
                } finally {
                    setIsUserAllowed(false)
                    setLoading(false)
                }
            }
        }

        getUserInfo()
    }, [session, user])

    console.log(isUserAllowed)

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
                    </>)
                }

            </Stack.Navigator>
        </NavigationContainer>
    )
}