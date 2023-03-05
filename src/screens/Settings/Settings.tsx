import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { KeyboardAvoidingView, Text, TouchableOpacity, View } from 'react-native';
import { supabase } from '../../utils/supabaseClient';
import { NavigatorParamList } from '../DrawerNavigator';
import Ionicon from '@expo/vector-icons/Ionicons';

type SettingsProps = NativeStackScreenProps<NavigatorParamList, 'Settings'>;

const Settings: React.FC<SettingsProps> = ({ navigation }) => {
  return (
    <KeyboardAvoidingView behavior="padding">
      <View className="h-full bg-white p-5 px-5 pt-16">
        <View className="items-start">
          <TouchableOpacity accessibilityRole="button">
            <Ionicon
              name={'arrow-back'}
              size={30}
              color={'#000000'}
              onPress={() => navigation.goBack()}
            />
          </TouchableOpacity>
        </View>

        <View className="items-center">
          <Text className="font-bebas text-4xl">Settings</Text>
        </View>

        <View className="items-center justify-center pt-80">
          <TouchableOpacity
            accessibilityRole="button"
            className="w-60 rounded-lg bg-red-500 p-2"
            onPress={() => supabase.auth.signOut()}
          >
            <Text className="text-center font-bebas text-2xl text-white">SIGN OUT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Settings;
