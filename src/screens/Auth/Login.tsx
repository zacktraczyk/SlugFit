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
import tw from "tailwind-react-native-classnames";
import { supabase } from "../../utils/supabaseClient";
import { AuthStackParamList } from "./AuthNavigator";

type FormElements = {
  email: string;
  password: string;
};

type LoginProps = NativeStackScreenProps<AuthStackParamList, "LoginScreen">;

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormElements) => {
    try {
      const { error: AuthError } = await supabase.auth.signInWithPassword(data);
      if (AuthError) throw AuthError;
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
        <View style={tw`flex flex-col h-full p-5 justify-center items-stretch`}>
          {/* Loader */}

          <View style={tw`flex flex-col h-96 justify-evenly items-stretch`}>
            <View>
              <Text style={tw`text-4xl`}>Email</Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={tw`text-xl border-b-2 mb-2`}
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
              <Text style={tw`text-red-500`}>
                {errors.email &&
                  (errors.email.type === "required"
                    ? "This field is required."
                    : "Not a valid email.")}
              </Text>
            </View>

            <View style={tw``}>
              <Text style={tw`text-3xl`}>Password</Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                  minLength: 8,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={tw`text-xl border-b-2 mb-2`}
                    secureTextEntry={true}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="password"
              />
              <Text style={tw`text-red-500`}>
                {errors.password &&
                  (errors.password.type === "required"
                    ? "This is required."
                    : "Password must be at least 8 characters.")}
              </Text>
            </View>

            <View>
              <Pressable
                style={tw`p-2 rounded my-2 w-20 bg-blue-400`}
                onPress={handleSubmit((data) => onSubmit(data))}
              >
                <Text style={tw`text-white text-center`}>Submit</Text>
              </Pressable>

              <Text
                style={tw`py-2`}
                onPress={() => navigation.navigate("RegisterScreen")}
              >
                Don't Have an Account? Register
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;
