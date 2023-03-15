import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { NavigatorParamList } from '../DrawerNavigator';
import Ionicon from '@expo/vector-icons/Ionicons';
import { useAuth } from '../../contexts/AuthProvider';
import * as ImagePicker from 'expo-image-picker';
import {
  updateProfilePicture,
  deleteProfilePicture,
  generateProfilePictureUrl,
} from '../../utils/db/profiles';
import { ExerciseAnalyticsDisplay } from '../../components/analytics/ExerciseAnalyticsDisplay';
import { useProfile } from '../../hooks/useProfile';

type ProfileProps = NativeStackScreenProps<NavigatorParamList, 'Profile'>;

const Profile: React.FC<ProfileProps> = ({ navigation }) => {
  const { session } = useAuth();

  const { userData } = useProfile(session?.user.id);

  // save user's profile picture
  const [image, setImage] = useState<string | undefined>(undefined);

  // Image Picker
  // lets user select an image from gallery and set as their profile picture
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.assets) {
      setImage(result.assets[0].uri);
      deleteProfilePicture(session);
      updateProfilePicture(result.assets[0].uri, session);
    }
  };

  const [pictureUrl, setPictureUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (session && userData && userData.avatar_url) {
      const url = generateProfilePictureUrl(session?.user.id, userData.avatar_url);
      setPictureUrl(url);
    }
  }, [session, userData]);

  return (
    <ScrollView className="h-full w-full bg-white">
      <View className="h-52 w-full rounded-b-[20px] bg-red-500 px-8 pt-16">
        <View className="items-end pb-2">
          <TouchableOpacity accessibilityRole="button">
            <Ionicon
              name={'settings-sharp'}
              size={24}
              color={'#ffffff'}
              onPress={() => navigation.navigate('Settings')}
            />
          </TouchableOpacity>
        </View>

        <View className="items-center justify-center">
          <Text className="pb-4 font-bebas text-3xl text-white">{userData.username}</Text>

          <Image
            className="h-40 w-40 justify-center rounded-xl border-4 border-white shadow-2xl"
            accessibilityIgnoresInvertColors
            source={{ uri: pictureUrl }}
            defaultSource={require('../../assets/genericProfilePic.jpg')}
          />

          <Image
            className="absolute top-[35px] h-40 w-40 justify-center rounded-xl border-4 border-white shadow-2xl"
            accessibilityIgnoresInvertColors
            source={{
              uri: image,
            }}
          />

          <View className="absolute right-[114px] top-[54px] h-[18px] w-[20px] bg-gray-400 shadow-2xl "></View>
          <View className="absolute right-[115px] top-[50px] shadow-2xl ">
            <TouchableOpacity accessibilityRole="button">
              <Ionicon name={'images-sharp'} size={21} color={'#f5f5f5'} onPress={pickImage} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View className="flex-column items-center pt-[95px]">
        <View className="flex-row">
          <Text className="pl-9 font-bebas text-4xl text-black">{userData.full_name} </Text>
          <TouchableOpacity accessibilityRole="button">
            <Ionicon
              name={'pencil-sharp'}
              size={24}
              color={'#000000'}
              onPress={() => navigation.navigate('AccountSettings')}
            />
          </TouchableOpacity>
        </View>
        <Text className="pb-6 font-bebas text-2xl text-gray-400">{userData.bodyweight} lbs</Text>
      </View>

      <Text className="pl-4 font-bebas text-3xl">Workout Analytics</Text>
      <ExerciseAnalyticsDisplay />
    </ScrollView>
  );
};

export default Profile;
