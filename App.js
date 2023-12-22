import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoadPage from "./screens/LoadPage";
import WelcomePage from "./screens/WelcomePage";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import ResetPassword from "./screens/ResetPassword";
import Onboarding1 from "./screens/Onboarding1";
import Onboarding2 from "./screens/Onboarding2";
import Dashboard from "./screens/Dashboard";
import Onboarding3 from "./screens/Onboarding3";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={LoadPage}
          options={{ headerShown: false, gestureEnabled: false }}
        />
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
        <Stack.Screen
          name="Onboarding1"
          component={Onboarding1}
          options={{ headerShown: false, gestureEnabled: false }}
        />
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
          name="Dashboard"
          component={Dashboard}
          options={{ headerShown: false, gestureEnabled: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
