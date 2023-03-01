import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { NavigatorParamList } from '../DrawerNavigator';
import Ionicon from '@expo/vector-icons/Ionicons';
import { useAuth } from '../../contexts/AuthProvider';
import { ProfileType } from '../../types';
import * as ImagePicker from 'expo-image-picker';
import {
  getUserProfile,
  updateProfilePicture,
  deleteProfilePicture,
} from '../../utils/db/profiles';

type ProfileProps = NativeStackScreenProps<NavigatorParamList, 'Profile'>;

const Profile: React.FC<ProfileProps> = ({ navigation }) => {
  const { session } = useAuth();

  // save user's profile data
  const [userData, setUserData] = useState<ProfileType>({});

  // save user's profile picture
  const [image, setImage] = useState<string | undefined>(undefined);

  // set user's profile data and profile picture
  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getUserProfile(session);
      setUserData(data);
    };

    fetchProfile().catch(console.error);
  });

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

  return (
    <View className="h-full w-full bg-white">
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
            className="shadow-1xl h-40 w-40 justify-center rounded-xl border-4 border-white"
            accessibilityIgnoresInvertColors
            source={require('../../assets/genericProfilePic.jpg')}
          />

          <Image
            className="absolute top-[35px] h-40 w-40 justify-center rounded-xl border-4 border-white shadow-2xl"
            accessibilityIgnoresInvertColors
            source={{
              uri:
                'https://veorawmuwkuyzbxadxgv.supabase.co/storage/v1/object/public/avatars/' +
                session?.user.id +
                '/' +
                userData.avatar_url,
            }}
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
    </View>
  );
};

export default Profile;
