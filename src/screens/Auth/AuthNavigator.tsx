import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Login from './Login';
import Register from './Register';

export type AuthStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginScreen" component={Login} options={{ headerShown: false }} />
      <Stack.Screen
        name="RegisterScreen"
        component={Register}
        options={{
          headerShown: false,

          title: 'Register',
          headerStyle: {
            backgroundColor: '#FFF',
          },
          headerTintColor: '#000',
        }}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
