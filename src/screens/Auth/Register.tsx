import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { supabase } from '../../utils/supabaseClient';
import { AuthStackParamList } from './AuthNavigator';
import Ionicon from '@expo/vector-icons/Ionicons';
import ErrorBoundary from 'react-native-error-boundary';
import ErrorScreen from '../../components/ErrorScreen';
import { ScrollView } from 'react-native-gesture-handler';

type FormElements = {
  email: string;
  password: string;
  passwordConfirm: string;
  username: string;
  full_name: string;
  bodyweight: number;
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
      username: '',
      full_name: '',
      bodyweight: 0,
    },
  });

  const onSubmit = async (data: FormElements) => {
    try {
      const { error: AuthError, data: tempData } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });
      if (AuthError) throw AuthError;

      const { error } = await supabase
        .from('profiles')
        .update({ username: data.username, full_name: data.full_name, bodyweight: data.bodyweight })
        .eq('id', tempData.user?.id);

      if (error) throw error;

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
    <ErrorBoundary FallbackComponent={ErrorScreen}>
      <ScrollView>
        <KeyboardAvoidingView behavior="padding">
          <TouchableWithoutFeedback accessibilityRole="button" onPress={Keyboard.dismiss}>
            <View className="flex h-full flex-col items-stretch p-5">
              {/* Loader */}

              <View className="flex h-96 flex-col items-stretch pt-2">
                <View>
                  <View className="flex-row pt-10">
                    <Ionicon
                      onPress={() => navigation.navigate('LoginScreen')}
                      name={'arrow-back'}
                      size={30}
                    />
                  </View>

                  <View className="items-center pb-5">
                    <Text className="text-center font-bebas text-4xl">Create Account</Text>
                  </View>

                  <Text className="font-bebas text-xl">Name</Text>
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        accessibilityLabel="Text input field"
                        accessibilityHint="Input email for register"
                        className="w-90 bg-white-500 my-2 mt-0 rounded-md border-2 border-gray-200 p-2 text-xl"
                        returnKeyType="next"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    name="full_name"
                  />
                  <Text className="pb-4 text-red-500">
                    {errors.full_name &&
                      (errors.full_name.type === 'required'
                        ? 'This field is required.'
                        : 'Not a valid name.')}
                  </Text>

                  <Text className="font-bebas text-xl">User Name</Text>
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        accessibilityLabel="Text input field"
                        accessibilityHint="Input email for register"
                        className="w-90 bg-white-500 my-2 mt-0 rounded-md border-2 border-gray-200 p-2 text-xl"
                        autoCapitalize="none"
                        returnKeyType="next"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    name="username"
                  />
                  <Text className="pb-4 text-red-500">
                    {errors.username &&
                      (errors.username.type === 'required'
                        ? 'This field is required.'
                        : 'Not a valid username.')}
                  </Text>

                  <Text className="font-bebas text-xl">Body Weight</Text>
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                      pattern: /^[0-9]{1,}$/i,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        accessibilityLabel="Text input field"
                        accessibilityHint="Input email for register"
                        className="w-90 bg-white-500 my-2 mt-0 rounded-md border-2 border-gray-200 p-2 text-xl"
                        autoCapitalize="none"
                        keyboardType="numeric"
                        returnKeyType="next"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value.toString()}
                      />
                    )}
                    name="bodyweight"
                  />
                  <Text className="pb-4 text-red-500">
                    {errors.bodyweight &&
                      (errors.bodyweight.type === 'required'
                        ? 'This field is required.'
                        : 'Not a valid bodyweight.')}
                  </Text>

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
                        accessibilityHint="Input email for register"
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
                  <Text className="pb-4 text-red-500">
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
                        accessibilityHint="Input password for register"
                        className="w-90 bg-white-500 my-2 mt-0 rounded-md border-2 border-gray-200 p-2 text-xl"
                        secureTextEntry={true}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    name="password"
                  />
                  <Text className="pb-4 text-red-500">
                    {errors.password &&
                      (errors.password.type === 'required'
                        ? 'This is required.'
                        : 'Password must be at least 8 characters.')}
                  </Text>
                </View>

                <View>
                  <Text className="font-bebas text-xl">Confirm Password</Text>
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
                        className="w-90 bg-white-500 my-2 mt-0 rounded-md border-2 border-gray-200 p-2 text-xl"
                        secureTextEntry={true}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    name="passwordConfirm"
                  />
                  <Text className="pb-4 text-red-500">
                    {errors.passwordConfirm &&
                      (errors.passwordConfirm.type === 'required'
                        ? 'This is required.'
                        : 'Passwords do not match.')}
                  </Text>
                </View>

                <View className="items-center pb-20">
                  <TouchableOpacity
                    accessibilityRole="button"
                    className="w-60 rounded-lg bg-red-500 p-2"
                    onPress={handleSubmit((data) => onSubmit(data))}
                  >
                    <Text className="text-center font-bebas text-2xl text-white">Register</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
    </ErrorBoundary>
  );
};

export default Register;
