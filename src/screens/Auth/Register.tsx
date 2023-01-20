import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
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

type FormElements = {
  email: string;
  password: string;
  passwordConfirm: string;
};

type LoginProps = NativeStackScreenProps<AuthStackParamList, 'RegisterScreen'>;

const Register: React.FC<LoginProps> = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const onSubmit = async (data: FormElements) => {
    try {
      const { error: AuthError } = await supabase.auth.signUp(data);
      if (AuthError) throw AuthError;
      alert('Check your email to confirm your account');
      navigation.navigate('LoginScreen');
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      alert(message);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding">
      <TouchableWithoutFeedback accessibilityRole="button" onPress={Keyboard.dismiss}>
        <View className="flex h-full flex-col items-stretch justify-center p-5">
          {/* Loader */}

          <View className="flex h-96 flex-col items-stretch justify-evenly">
            <View>
              <Text className="text-4xl">Email</Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    accessibilityLabel="Text input field"
                    accessibilityHint="Input email for register"
                    className="mb-2 border-b-2 text-xl"
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
              <Text className="text-3xl">Password</Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                  minLength: 8,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    accessibilityLabel="Text input field"
                    accessibilityHint="Input password for register"
                    className="mb-2 border-b-2 text-xl"
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

            <View>
              <Text className="text-3xl">Confirm Password</Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                  minLength: 8,
                  validate: {
                    passwordEqual: (value) => {
                      return value === getValues().password;
                    },
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    accessibilityLabel="Text input field"
                    accessibilityHint="Input password confirmation for register"
                    className="mb-2 border-b-2 text-xl"
                    secureTextEntry={true}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="passwordConfirm"
              />
              <Text className="text-red-500">
                {errors.passwordConfirm &&
                  (errors.passwordConfirm.type === 'required'
                    ? 'This is required.'
                    : 'Passwords do not match.')}
              </Text>
            </View>

            <View>
              <Pressable
                accessibilityRole="button"
                className="my-2 w-20 rounded bg-blue-400 p-2"
                onPress={handleSubmit((data) => onSubmit(data))}
              >
                <Text className="text-center text-white">Submit</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Register;
