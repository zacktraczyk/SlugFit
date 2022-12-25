import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Button, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { supabase } from "../utils/supabaseClient";
import { HomeStackParamList } from "./HomeNavigator";

type HomeProps = NativeStackScreenProps<HomeStackParamList, "Home">;

const Home: React.FC<HomeProps> = ({ navigation }) => {
  return (
    <View style={tw`flex flex-col h-full justify-center items-center`}>
      <Text>Home Page yay</Text>
      <Text>Yipee</Text>
      <View style={tw`h-10`}></View>
      <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
      <Button
        title="Account"
        onPress={() => navigation.navigate("AccountSettings")}
      />
    </View>
  );
};

export default Home;
