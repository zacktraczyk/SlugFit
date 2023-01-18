import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthError } from "@supabase/supabase-js";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { supabase } from "../../utils/supabaseClient";
import { AuthStackParamList } from "./AuthNavigator";

type FormElements = {
  email: string;
  password: string;
  passwordConfirm: string;
};

type LoginProps = NativeStackScreenProps<AuthStackParamList, "RegisterScreen">;

const Register: React.FC<LoginProps> = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = async (data: FormElements) => {
    try {
      const { error: AuthError } = await supabase.auth.signUp(data);
      if (AuthError) throw AuthError;
      alert("Check your email to confirm your account");
      navigation.navigate("LoginScreen");
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      alert(message);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex flex-col h-full p-5 justify-center items-stretch">
          {/* Loader */}

          <View className="flex flex-col h-96 justify-evenly items-stretch">
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
                    className="text-xl border-b-2 mb-2"
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
                  (errors.email.type === "required"
                    ? "This field is required."
                    : "Not a valid email.")}
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
                    className="text-xl border-b-2 mb-2"
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
                  (errors.password.type === "required"
                    ? "This is required."
                    : "Password must be at least 8 characters.")}
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
                    className="text-xl border-b-2 mb-2"
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
                  (errors.passwordConfirm.type === "required"
                    ? "This is required."
                    : "Passwords do not match.")}
              </Text>
            </View>

            <View>
              <Pressable
                className="p-2 rounded my-2 w-20 bg-blue-400"
                onPress={handleSubmit((data) => onSubmit(data))}
              >
                <Text className="text-white text-center">Submit</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Register;
