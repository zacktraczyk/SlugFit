import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';
import { useAuth } from '../contexts/AuthProvider';
import { supabase } from '../utils/supabaseClient';
import { HomeStackParamList } from './HomeNavigator';

type HomeProps = NativeStackScreenProps<HomeStackParamList, 'Home'>;

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const { session } = useAuth();

  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');

  useEffect(() => {
    if (!session) return;

    getName();
  }, [session]);

  const getName = async () => {
    try {
      setLoading(true);
      if (!session || !session.user) {
        throw 'no user session';
      }
      const user = session.user;

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username`)
        .eq('id', user.id)
        .single();

      if (error && status !== 406) throw error;

      if (data) {
        setName(data.username);
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
