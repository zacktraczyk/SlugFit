import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";

const App: React.FC = () => {
  return (
    <View style={[tw`h-full flex flex-col justify-center items-center`]}>
      <Text>Open up App.tsx work on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
};

export default App;
