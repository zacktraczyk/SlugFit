/// <reference types="nativewind/types" />

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Font from 'expo-font';
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { supabase } from '../../utils/supabaseClient';
import { AuthStackParamList } from './AuthNavigator';

// Import the font
Font.loadAsync({
  'BebasNeue': require('../../assets/fonts/BebasNeue-Regular.ttf')
})

type FormElements = {
  email: string;
  password: string;
};

type LoginProps = NativeStackScreenProps<AuthStackParamList, 'LoginScreen'>;

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormElements) => {
    try {
      setLoading(true);
      const { error: AuthError } = await supabase.auth.signInWithPassword(data);
      if (AuthError) throw AuthError;
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      alert(message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <View className="flex h-full flex-col items-stretch justify-center p-5">
      <View>
      <Text style={{ textAlign: 'center', fontFamily: 'BebasNeue', fontSize: 96}}>SlugFit</Text>
      <Text style={{ lineHeight: 24 * 0.3, 
                    paddingTop: 24 - (24 * 0.3), 
                    paddingBottom: 50,
                    textAlign: 'center', 
                    fontFamily: 'BebasNeue', 
                    fontSize: 24,
                    color: '#3C3A3A' }}>We see mass in your future</Text>
    </View>
      <KeyboardAvoidingView behavior="padding">
        <TouchableWithoutFeedback accessibilityRole="button" onPress={Keyboard.dismiss}>
          <View className="flex h-96 flex-col items-stretch justify-evenly">
            <View style={{}}>
            <Text style={{ fontFamily: 'BebasNeue', fontSize: 18 }}>Email</Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  
                  <TextInput
                    accessibilityLabel="Text input field"
                    accessibilityHint="Input email for login"
                    className="my-2 mt-0 w-90 rounded-md bg-white-500 border-2 border-gray-200 p-2 text-xl"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    returnKeyType="next"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="email"
              />
              <Text className="text-red-500">
                {errors.email &&
                  (errors.email.type === 'required'
                    ? 'This field is required.'
                    : 'Not a valid email.')}
              </Text>
            </View>

            <View>
            <Text style={{ fontFamily: 'BebasNeue', fontSize: 18 }}>Password</Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                  minLength: 8,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    accessibilityLabel="Text input field"
                    accessibilityHint="Input password for login"
                    className="my-2 mt-0 w-90 rounded-md bg-white-500 border-2 border-gray-200 p-2 text-xl"
                    secureTextEntry={true}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="password"
              />
              <Text className="text-red-500">
                {errors.password &&
                  (errors.password.type === 'required'
                    ? 'This is required.'
                    : 'Password must be at least 8 characters.')}
              </Text>
            </View>

            <View style={{ alignItems: "center" }}>
              <Pressable
                accessibilityRole="button"
                accessibilityHint="Login to application"
                className="my-2 mt-0 w-60 rounded-lg bg-red-500 p-2"
                onPress={handleSubmit((data) => onSubmit(data))}
              >
                <Text style={{ textAlign: 'center', color: 'white', fontFamily: 'BebasNeue', fontSize: 24 }}>Sign In</Text>
              </Pressable>
              <Text>
                <Text>Don&apos;t Have an Account?
                </Text>
                <Text style={{fontWeight: "bold"}} className="py-2" onPress={() => navigation.navigate('RegisterScreen')}>{' '}Create One
                </Text>
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      {loading && <ActivityIndicator size="large" />}
    </View>
  );
};
 
export default Login;
