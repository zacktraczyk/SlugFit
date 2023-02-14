import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';
import { useAuth } from '../../contexts/AuthProvider';
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
      <Button title="Start Workout" onPress={() => navigation.navigate('SelectWorkout')} />
    </View>
  );
};

export default Home;
