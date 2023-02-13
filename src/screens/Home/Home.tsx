import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';
import { useAuth } from '../../contexts/AuthProvider';
import { supabase } from '../../utils/supabaseClient';
import { useUserData } from '../../hooks/useUserData';
import { NavigatorParamList } from '../DrawerNavigator';
import ExerciseCard from '../../components/ExerciseCard';
import { Exercise, Set, Note, Rest } from '../../types';
import { ExerciseCardProps } from '../../components/ExerciseCard';

type HomeProps = NativeStackScreenProps<NavigatorParamList, 'Home'>;

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const { session } = useAuth();
  const [name, setName] = useState('');
  const { userData, loading } = useUserData(session);
  /** TESTING DATA */
  const tempWarmUpSet: Set = {
    id: 123,
    reps: '8-9',
    rpe: '10', // Rating of Perceived Exertion
    orm: '95%', // One Rep Max
    warmup: true,
  };
  const tempWorkingSet: Set = {
    id: 123,
    reps: '8-9',
    rpe: '10', // Rating of Perceived Exertion
    orm: '95%', // One Rep Max
    warmup: false,
  };
  const tempNote: Note = {
    id: 123,
    text: 'Shoulder width apart',
  };
  const tempRest: Rest = {
    id: 123,
    minutes: '99',
    seconds: '99',
  };

  const tempExercise: Exercise = {
    name: 'Pull-ups',
    items: [tempWarmUpSet, tempWorkingSet, tempNote, tempRest],
  };

   /** END OF TESTING DATA */
  useEffect(() => {
    if (userData?.username) setName(userData.username);
    else setName('');
  }, [userData]);

  return (
    <View className="flex h-full flex-col items-center">
      <ExerciseCard exercise={tempExercise}/>
    </View>
  );
};

export default Home;
