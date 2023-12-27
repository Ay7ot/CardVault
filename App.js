import { GeneralAppProvider } from "./context/GeneralAppContext";
import Navigation from "./screens/Navigation";

export default function App() {
  return (
    <GeneralAppProvider>
      <Navigation />
    </GeneralAppProvider>
  );
}
