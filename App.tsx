import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import Temp from "./src/screens/Temp";
import tw from "tailwind-react-native-classnames";

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Temp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
