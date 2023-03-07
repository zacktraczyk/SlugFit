import React, { useEffect, useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, Keyboard } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { ExerciseTemplate } from '../types';
import { getAllEditableExercises } from '../utils/db/editableexercises';
import Chip from './CustomChip';
import ExerciseFilterModal from './modals/ExerciseFilterModal';

export type ExerciseSearchBarProps = {
  onSelectExercise: (exercise: string) => void;
};

const MAX_SEARCH_RESULTS = 50;

const ExerciseSearchBar: React.FC<ExerciseSearchBarProps> = ({ onSelectExercise }) => {
  const [searchOnFocus, setSearchOnFocus] = useState(false);
  const [allExercises, setAllExercises] = useState<ExerciseTemplate[]>([]);

  const [filters, setFilters] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState('');

  const [filteredExercises, setFilteredExercises] = useState<ExerciseTemplate[]>([]);
  const [searchResults, setSearchResults] = useState<ExerciseTemplate[]>([]);

  // Update Filteres Exercises and constrain search results to filtered
  // Exercises
  const onSelectFilters = (filterArr: string[]) => {
    setFilters([...filterArr]);

    if (filterArr.length == 0) {
      setFilteredExercises(allExercises);
      setSearchResults(allExercises);
      return;
    }

    // Filter exercises by only including exercises that contain some part of a
    // filter in filterArr
    const _filteredExercises = allExercises.filter((exercise) => {
      return filterArr.some((filter) => exercise.muscle_group.includes(filter));
    });

    setFilteredExercises(_filteredExercises);
    setSearchResults(_filteredExercises);
  };

  // Search from already filtered exercises
  const onSearchChangeText = (search: string) => {
    setSearchInput(search);

    const _searchResults = filteredExercises.filter((exercise) => {
      return exercise.name.toLowerCase().includes(search.toLowerCase());
    });

    setSearchResults(_searchResults);
  };

  const onExerciseSelect = (item: string) => {
    onSelectExercise(item);
    setSearchOnFocus(false);
    setSearchInput('');
    setSearchResults(allExercises);
    Keyboard.dismiss();
  };

  useEffect(() => {
    const fetchExercises = async () => {
      const exercises = await getAllEditableExercises();
      setAllExercises(exercises);
      setFilteredExercises(exercises);
      setSearchResults(exercises);
    };

    fetchExercises().catch(console.error);
  }, []);

  return (
    <View className="z-50 flex w-screen items-center bg-white">
      {/* Search Bar */}
      <View className="mt-7 flex h-12 w-11/12 flex-row items-center justify-between rounded border border-slate-200">
        <TextInput
          accessibilityLabel="Exercise Search Text Field "
          accessibilityHint="Input characters to search for an exercise"
          className="h-full grow px-5"
          autoCapitalize="none"
          placeholder="Search for an exercise"
          returnKeyType="next"
          value={searchInput}
          onFocus={() => setSearchOnFocus(true)}
          onChangeText={onSearchChangeText}
        />
        <View className="mr-2">
          <ExerciseFilterModal onClose={onSelectFilters} />
        </View>
      </View>

      {/* Results Modal */}
      {searchOnFocus && (
        <View className="divide-y-10 absolute z-50 mt-20 h-60 w-11/12 overflow-scroll rounded border border-slate-200 bg-white">
          <ScrollView>
            <View className="m-5">
              {/* Filter Chips */}
              {filters.length > 0 && (
                <View className="border-b-0.5 mb-3 flex flex-row border-slate-400 pb-2">
                  <ScrollView horizontal={true}>
                    {filters.map((item) => {
                      return <Chip key={item} value={item} closeable={false} />;
                    })}
                  </ScrollView>
                </View>
              )}

              {/* Search Results */}
              {searchResults.length > 0 ? (
                searchResults.slice(0, MAX_SEARCH_RESULTS).map((item) => {
                  return (
                    <TouchableOpacity
                      accessibilityRole="button"
                      key={item.name}
                      onPress={() => onExerciseSelect(item.name)}
                      className="mb-1 rounded border border-slate-200 p-3"
                    >
                      <Text className="font-bold">{item.name}</Text>
                    </TouchableOpacity>
                  );
                })
              ) : (
                <Text className="p-3 text-slate-500">No Matching Exercises</Text>
              )}
            </View>
          </ScrollView>
          <TouchableOpacity
            className="flex w-full items-center p-3"
            accessibilityRole="button"
            onPress={() => setSearchOnFocus(false)}
          >
            <Entypo name="chevron-thin-up" size={24} color="black" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ExerciseSearchBar;
