import { GestureHandlerRootView } from "react-native-gesture-handler";
import { GeneralAppProvider } from "./context/GeneralAppContext";
import Navigation from "./screens/Navigation";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <GeneralAppProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style="dark" />
        <Navigation />
      </GestureHandlerRootView>
    </GeneralAppProvider>
  );
}
