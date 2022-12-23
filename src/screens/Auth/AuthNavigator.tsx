import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import Login from "./Login";
import Register from "./Register";

export type AuthStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginScreen"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={Register}
        options={{
          title: "Register",
          headerStyle: {
            backgroundColor: "#FFF", // background color
          },
          headerTintColor: "#000", // text color
        }}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
