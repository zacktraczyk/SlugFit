/// <reference types="nativewind/types" />

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
// import Google font through expo
import { useFonts, BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';

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

import ErrorBoundary from 'react-native-error-boundary';
import ErrorScreen from '../../components/ErrorScreen';
import ComponentWithError from '../../components/ComponentWithError';

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

  // Load font
  const [fontsLoaded] = useFonts({
    BebasNeue_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorScreen}>
      <View className="flex h-full flex-col items-stretch justify-center p-5">
        <View>
          <Text className="pt-1 text-center font-bebas text-8xl">SlugFit</Text>
          <Text className="text-center font-bebas text-2xl text-stone-700">
            We see mass in your future
          </Text>
        </View>
        <KeyboardAvoidingView behavior="padding">
          <TouchableWithoutFeedback accessibilityRole="button" onPress={Keyboard.dismiss}>
            <View className="flex h-96 flex-col items-stretch justify-evenly">
              <View style={{}}>
                <Text className="font-bebas text-xl">Email</Text>
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
                      className="w-90 bg-white-500 my-2 mt-0 rounded-md border-2 border-gray-200 p-2 text-xl"
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
                <Text className="font-bebas text-xl">Password</Text>
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
                      className="w-90 bg-white-500 my-2 mt-0 rounded-md border-2 border-gray-200 p-2 text-xl"
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

              <View style={{ alignItems: 'center' }}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityHint="Login to application"
                  className="my-2 mt-0 w-60 rounded-lg bg-red-500 p-2"
                  onPress={handleSubmit((data) => onSubmit(data))}
                >
                  <Text className="text-center font-bebas text-2xl text-white">Sign In</Text>
                </Pressable>
                <Text>
                  <Text className="text-sm">Don&apos;t Have an Account?</Text>
                  <Text
                    className="text-sm font-bold"
                    onPress={() => navigation.navigate('RegisterScreen')}
                  >
                    {' '}
                    Create One
                  </Text>
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        {loading && <ActivityIndicator size="large" />}
      </View>
    </ErrorBoundary>
  );
};

export default Login;
