import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { useAuth } from "../../contexts/AuthProvider";
import { supabase } from "../../utils/supabaseClient";
import { HomeStackParamList } from "../HomeNavigator";
import Avatar from "./Avatar";

interface ProfileDetails {
  username: null | string;
  website: null | string;
  // avatar_url: null | string;
}

type AccountSettingsProps = NativeStackScreenProps<
  HomeStackParamList,
  "AccountSettings"
>;

const AccountSettings: React.FC<AccountSettingsProps> = () => {
  const { session } = useAuth();

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      website: "",
    },
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) return;

    getProfile();
  }, [session]);

  const getProfile = async () => {
    try {
      setLoading(true);
      const user = session!.user;

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) throw error;

      if (data) {
        setValue("username", data.username);
        setValue("website", data.website);
      }
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: ProfileDetails) => {
    const { username, website } = data;

    try {
      setLoading(true);
      const user = session!.user;

      const updates = {
        id: user.id,
        username,
        website,
        updated_at: new Date(),
      };

      let { error: AuthError } = await supabase
        .from("profiles")
        .upsert(updates);

      if (AuthError) {
        throw AuthError;
      }
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
    <KeyboardAvoidingView behavior="padding">
      <View>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
            <Text>Email: {session?.user.email}</Text>
            <View>
              <Text>Name</Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className="border-2 mb-2"
                    returnKeyType="next"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="username"
              />
            </View>
            <View>
              <Text>Website</Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className="border-2 mb-2"
                    returnKeyType="next"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="website"
              />
            </View>
            <View>
              <Pressable
                className="p-2 rounded my-2 w-20 bg-blue-400"
                onPress={handleSubmit((data) => updateProfile(data))}
              >
                <Text className="text-white text-center">Submit</Text>
              </Pressable>
            </View>
            <Button title="signOut" onPress={() => supabase.auth.signOut()} />
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default AccountSettings;
