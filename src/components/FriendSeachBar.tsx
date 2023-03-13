import React, { useEffect, useState } from 'react';
import { getAllUserNames, getUserProfile } from '../utils/db/profiles';
import { ProfileType } from '../types';
import { useAuth } from '../contexts/AuthProvider';
import { View, Text, TouchableOpacity } from 'react-native';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import Ionicon from '@expo/vector-icons/Ionicons';
import { supabase } from '../utils/supabaseClient';

const MAX_SEARCH_RESULTS = 50;

const FriendSearchBar: React.FC = () => {
  const { session } = useAuth();

  // save every user's username
  const [userNames, setUserNames] = useState<ProfileType[]>([]);

  // save user's profile data
  const [userData, setUserData] = useState<ProfileType>({});

  // current text field input
  const [searchInput, setSearchInput] = useState('');

  // show/hide search results
  const [searchOnFocus, setSearchOnFocus] = useState(false);

  // filtered usernames
  const [searchResults, setSearchResults] = useState<ProfileType[]>([]);

  // rerender everytime a friend is added
  const [count, setCount] = useState(1);

  useEffect(() => {
    const fetchUserNames = async () => {
      if (!session) return;
      const data = await getAllUserNames();
      setUserNames(data);
      setSearchResults(data);
      const data1 = await getUserProfile(session?.user.id);
      setUserData(data1);
    };

    fetchUserNames().catch(console.error);
  }, [count]);

  // Filters search results with text input
  const onSearchChangeText = (search: string) => {
    setSearchInput(search);

    const _searchResults = userNames.filter((filteredUserNames) => {
      return filteredUserNames.username?.toLowerCase().includes(search.toLowerCase());
    });

    setSearchResults(_searchResults);
  };

  // Add an id to friends list
  const addFriend = async (friendId: string) => {
    setCount(count + 1);
    try {
      userData.friends?.push(friendId);

      const { error } = await supabase
        .from('profiles')
        .update({ friends: userData.friends })
        .eq('id', userData.id);

      if (error) {
        throw error;
      }
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      alert(message);
    }
  };

  function closeResultModal() {
    setSearchInput('');
    setSearchOnFocus(false);
    setCount(count + 1);
  }

  return (
    <View className="flex items-center w-screen bg-white ">
      {/* Search Bar */}
      <View className="flex-row items-center justify-between w-11/12 h-12 pl-4 border rounded border-slate-200">
        <Ionicon
          name={'search-outline'}
          size={24}
          color={'#323232'}
          onPress={() => setSearchOnFocus(true)}
        />
        <TextInput
          accessibilityLabel="Text input field"
          accessibilityHint="Input characters to search for a username"
          className="h-full px-5 grow"
          autoCapitalize="none"
          placeholder="  Add friends by username"
          returnKeyType="done"
          value={searchInput}
          onFocus={() => setSearchOnFocus(true)}
          onChangeText={onSearchChangeText}
        />
      </View>

      {/* Results Modal */}
      {searchOnFocus && (
        <View className="w-11/12 mt-2 overflow-scroll bg-white border rounded divide-y-10 h-60 border-slate-200">
          <ScrollView>
            <View className="m-5">
              {/* Search Results */}
              {searchResults.length > 0 ? (
                searchResults.slice(0, MAX_SEARCH_RESULTS).map((item) => {
                  return (
                    <View
                      key={item.id}
                      className="flex-row p-2 px-3 mb-1 border rounded border-slate-200"
                    >
                      <Text className="text-lg font-bebas">{item.username}</Text>

                      <View className="flex-1 w-full"></View>

                      {userData.friends?.includes(item.id) ? (
                        <Text className="pt-1.5 text-xs font-medium">Already Added</Text>
                      ) : (
                        <View>
                          {userData.id == item.id ? (
                            <Text className="pt-1.5 text-xs font-medium">Self</Text>
                          ) : (
                            <TouchableOpacity
                              accessibilityRole="button"
                              onPress={() => addFriend(item.id)}
                              className="pt-1"
                            >
                              <Ionicon name={'person-add'} size={20} color={'#323232'} />
                            </TouchableOpacity>
                          )}
                        </View>
                      )}
                    </View>
                  );
                })
              ) : (
                <View className="items-center justify-center p-3">
                  <Text className="text-slate-500">User Does Not Exist</Text>
                </View>
              )}
            </View>
          </ScrollView>
          <TouchableOpacity
            className="flex items-center w-full p-3"
            accessibilityRole="button"
            onPress={() => closeResultModal()}
          >
            <Entypo name="chevron-thin-up" size={24} color="black" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default FriendSearchBar;
