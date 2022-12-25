import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { useAuth } from "../../contexts/AuthProvider";
import { supabase } from "../../utils/supabaseClient";
import { HomeStackParamList } from "../HomeNavigator";
import Avatar from "./Avatar";

interface ProfileDetails {
  username: null | string;
  website: null | string;
  avatar_url: null | string;
}

type AccountSettingsProps = NativeStackScreenProps<
  HomeStackParamList,
  "AccountSettings"
>;

const AccountSettings: React.FC<AccountSettingsProps> = () => {
  const { session } = useAuth();

  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<null | string>(null);
  const [website, setWebsite] = useState<null | string>(null);
  const [avatar_url, setAvatarUrl] = useState<null | string>(null);

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
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
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

  const updateProfile = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const user = session!.user;

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      };

      let { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
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
              <TextInput style={tw`border-2 mb-2`} returnKeyType="next" />
            </View>
            <View>
              <Text>Website</Text>
              <TextInput style={tw`border-2 mb-2`} returnKeyType="go" />
            </View>
            <View>
              <Button title="Update Profile" />
            </View>
            <Button title="signOut" onPress={() => supabase.auth.signOut()} />
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default AccountSettings;
