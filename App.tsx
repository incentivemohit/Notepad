import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import RootStackNavigation from "./src/navigations/RootStackNavigation";
import Providers from "./src/Providers/Providers";

export default function App() {
  return (
    <>
      <NavigationContainer>
        <PaperProvider>
          <Providers>
            <RootStackNavigation />
          </Providers>
        </PaperProvider>
      </NavigationContainer>
    </>
  );
}
