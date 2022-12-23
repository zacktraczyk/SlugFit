import { AuthError } from "@supabase/supabase-js";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button, Text, TextInput, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { supabase } from "../../utils/supabaseClient";

type FormElements = {
  email: string;
  password: string;
  passwordConf: string;
};

const Register: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      passwordConf: "",
    },
  });

  const onSubmit = async (data: FormElements) => {
    const { email, password } = data;
    try {
      const { error: AuthError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (AuthError) throw AuthError;
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      alert(message);
    } finally {
      alert("Registerd Successfully");
    }
  };

  return (
    <View style={tw`flex flex-col h-full justify-center items-center`}>
      <View
        style={tw`flex flex-col border h-2/3 w-2/3 p-5 justify-evenly items-stretch`}
      >
        <View style={tw`h-20`}>
          <Text style={tw`text-xl`}>Email</Text>
          <Controller
            control={control}
            rules={{
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={tw`border-2 bg-white`}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="email"
          />
          {errors.email &&
            (errors.email.type === "required" ? (
              <Text>This field is required.</Text>
            ) : (
              <Text>Not a valid email.</Text>
            ))}
        </View>

        <View style={tw`h-20`}>
          <Text style={tw`text-xl`}>Password</Text>
          <Controller
            control={control}
            rules={{
              required: true,
              minLength: 8,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={tw`border-2 bg-white`}
                secureTextEntry={true}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="password"
          />
          {errors.password &&
            (errors.password.type === "required" ? (
              <Text>This is required.</Text>
            ) : (
              <Text>Password must be at least 8 characters.</Text>
            ))}
        </View>

        <View style={tw`h-20`}>
          <Text style={tw`text-xl`}>Confirm Password</Text>
          <Controller
            control={control}
            rules={{
              required: true,
              minLength: 8,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={tw`border-2 bg-white`}
                secureTextEntry={true}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="passwordConf"
          />
          {errors.password &&
            (errors.password.type === "required" ? (
              <Text>This is required.</Text>
            ) : (
              <Text>Password must be at least 8 characters.</Text>
            ))}
        </View>
        <Button
          title="Submit"
          onPress={handleSubmit((data) => onSubmit(data))}
        />
      </View>
    </View>
  );
};

export default Register;
