import { useEffect, useReducer, useState } from "react";
import { useGeneralAppContext } from "../utils/useGeneralAppContext";
import { generalAppReducer } from "../utils/generalAppReducer";
import { supabase } from "../utils/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GeneralAppContext } from "./generalAppContextValue";


export function GeneralAppProvider({ children }) {
    const value = useGeneralAppContext();

    const [generalState, generalDispatch] = useReducer(generalAppReducer, value);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
                setLoading(true)
                generalDispatch({
                    type: 'setUserSession',
                    payload: {
                        sessionPayload: session ?? null
                    },
                });
                setLoading(false)
            });

            try {
                const userInfo = await AsyncStorage.getItem('user');
                if (userInfo) {
                    generalDispatch({
                        type: 'setUser',
                        payload: {
                            userPayload: JSON.parse(userInfo),
                        },
                    });
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false); // Set loading to false once everything is done
            }

            return () => {
                authListener.unsubscribe();
            };
        };

        fetchData(); // Invoke the fetchData function

    }, []);

    // Render children only when loading is false
    return !loading ? (
        <GeneralAppContext.Provider value={{ ...generalState, generalDispatch }}>
            {children}
        </GeneralAppContext.Provider>
    ) : null;
}
