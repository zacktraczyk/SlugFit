import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { useAuth } from '../../contexts/AuthProvider';
import { NavigatorParamList } from '../DrawerNavigator';
import Ionicon from '@expo/vector-icons/Ionicons';
import { getUserProfile, updateUserProfile } from '../../utils/db/profiles';
import { ScrollView } from 'react-native-gesture-handler';
import { ProfileType } from '../../types';

type AccountSettingsProps = NativeStackScreenProps<NavigatorParamList, 'AccountSettings'>;

const AccountSettings: React.FC<AccountSettingsProps> = ({ navigation }) => {
  const { session } = useAuth();

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      full_name: '',
      avatar_url: '',
      website: '',
      bodyweight: 0,
    },
  });

  const [loading, setLoading] = useState(true);

  // set user's profile data
  useEffect(() => {
    const fetchProfile = async () => {
      if (!session) return;
      const data = await getUserProfile(session?.user.id);
      if (data) {
        setValue('username', data.username ?? '');
        setValue('full_name', data.full_name ?? '');
        setValue('avatar_url', data.avatar_url ?? '');
        setValue('website', data.website ?? '');
        setValue('bodyweight', data.bodyweight ?? 0);
      }
    };

    fetchProfile().catch(console.error);
    setLoading(false);
  }, [session]);

  // when "save changes" is pressed, only update if there's no errors
  // if update is successful, navigate to prev screen
  function onPressSubmitButton(data: ProfileType) {
    if (!errors.username && !errors.full_name && !errors.bodyweight) {
      updateUserProfile(data, session);
      navigation.goBack();
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView className="h-full bg-white">
        <TouchableWithoutFeedback accessibilityRole="button" onPress={Keyboard.dismiss}>
          <View>
            {loading ? (
              <ActivityIndicator size="large" />
            ) : (
              <>
                <View className="h-full bg-white p-5">
                  <View className="items-start pt-12">
                    <TouchableOpacity accessibilityRole="button">
                      <Ionicon
                        name={'arrow-back'}
                        size={30}
                        color={'#000000'}
                        onPress={() => navigation.goBack()}
                      />
                    </TouchableOpacity>
                  </View>

                  <View className="items-center justify-center">
                    <Text className="pb-4 font-bebas text-4xl">Account Settings</Text>
                  </View>

                  <Text className="pt-4 font-bebas text-xl">USERNAME</Text>
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        accessibilityLabel="Text input Input"
                        accessibilityHint="Input to change account name"
                        className="w-90 bg-white-500 my-2 mt-0 rounded-md border-2 border-gray-200 p-2 pb-4 text-xl"
                        autoCapitalize="none"
                        returnKeyType="done"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    name="username"
                  />
                  {errors.username && errors.username.type === 'required' ? (
                    <Text className="text-red-500">This field is required.</Text>
                  ) : (
                    <Text></Text>
                  )}

                  <Text className="pt-4 font-bebas text-xl">NAME</Text>
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        accessibilityLabel="Text input Input"
                        accessibilityHint="Input to change account name"
                        className="w-90 bg-white-500 my-2 mt-0 rounded-md border-2 border-gray-200 p-2 pb-4 text-xl"
                        returnKeyType="done"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    name="full_name"
                  />
                  {errors.full_name && errors.full_name.type === 'required' ? (
                    <Text className="text-red-500">This field is required.</Text>
                  ) : (
                    <Text></Text>
                  )}

                  <Text className="pt-4 font-bebas text-xl">WEIGHT</Text>
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        accessibilityLabel="Text input field"
                        accessibilityHint="Input to change account website"
                        className="w-90 bg-white-500 my-2 mt-0 rounded-md border-2 border-gray-200 p-2 pb-4 text-xl"
                        returnKeyType="done"
                        keyboardType="numeric"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value.toString()}
                      />
                    )}
                    name="bodyweight"
                  />
                  {errors.bodyweight && errors.bodyweight.type === 'required' ? (
                    <Text className="text-red-500">This field is required.</Text>
                  ) : (
                    <Text></Text>
                  )}

                  <View className="items-center pt-8">
                    <TouchableOpacity
                      accessibilityRole="button"
                      className="w-60 rounded-lg bg-red-500 p-2"
                      onPress={handleSubmit((data) => onPressSubmitButton(data))}
                    >
                      <Text className="text-center font-bebas text-2xl text-white">
                        Save Changes
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AccountSettings;
