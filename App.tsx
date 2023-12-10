import { NavigationContainer } from "@react-navigation/native";
import StackNavigaton from "./src/navigations/StackNavigaton";
import ContextProvider from "./src/Context";
import { PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <>
      <NavigationContainer>
        <PaperProvider>
          <ContextProvider>
            <StackNavigaton />
          </ContextProvider>
        </PaperProvider>
      </NavigationContainer>
    </>
  );
}
