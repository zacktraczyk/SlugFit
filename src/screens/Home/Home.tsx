import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';
import { useAuth } from '../../contexts/AuthProvider';
import { supabase } from '../../utils/supabaseClient';
import { useUserData } from '../../hooks/useUserData';
import { NavigatorParamList } from '../DrawerNavigator';

type HomeProps = NativeStackScreenProps<NavigatorParamList, 'Home'>;

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const { session } = useAuth();
  const [name, setName] = useState('');
  const { userData, loading } = useUserData(session);

  useEffect(() => {
    if (userData?.username) setName(userData.username);
    else setName('');
  }, [userData]);

  return (
    <View className="flex h-full flex-col items-center justify-center">
      <Text>Home Page yay</Text>
      {loading ? <ActivityIndicator /> : <Text>Welcome {name}!</Text>}
      <Text>Yipee</Text>
      <View className="h-10"></View>
      <View className="flex flex-row">
        <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
        <View className="w-5"></View>
        <Button title="Account" onPress={() => navigation.navigate('AccountSettings')} />
      </View>
    </View>
  );
};

export default Home;
