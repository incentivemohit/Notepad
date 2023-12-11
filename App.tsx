import { NavigationContainer } from "@react-navigation/native";
import ContextProvider from "./src/Context";
import { PaperProvider } from "react-native-paper";
import RootStackNavigation from "./src/navigations/RootStackNavigation";

export default function App() {
  return (
    <>
      <NavigationContainer>
        <PaperProvider>
          <ContextProvider>
           <RootStackNavigation/>
          </ContextProvider>
        </PaperProvider>
      </NavigationContainer>
    </>
  );
}
