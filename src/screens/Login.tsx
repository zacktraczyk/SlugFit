import { AuthError } from "@supabase/supabase-js";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button, Text, TextInput, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { supabase } from "../utils/supabaseClient";

type FormElements = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
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
    <View>
      <Controller
        control={control}
        rules={{
          required: true,
          pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={tw``}
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

      <Controller
        control={control}
        rules={{
          required: true,
          minLength: 8,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={tw``}
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

      <Button title="Submit" onPress={handleSubmit((data) => onSubmit(data))} />
    </View>
  );
};

export default Login;
