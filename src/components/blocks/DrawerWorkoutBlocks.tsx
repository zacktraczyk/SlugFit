import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { EditableWorkout } from '../../types';

export type DrawerWorkoutBlockProps = {
  editableWorkout: EditableWorkout;
  editableWorkoutNavigate: (id: string, workoutName: string) => void;
  editableExerciseNavigate: (id: string, workoutName: string, exerciseName: string) => void;
};
const DrawerWorkoutBlock: React.FC<DrawerWorkoutBlockProps> = ({
  editableWorkout,
  editableWorkoutNavigate,
  editableExerciseNavigate,
}) => {
  const [showExercises, setShowExercises] = React.useState<boolean>(false);

  return (
    <View>
      <View className="my-2 flex flex-col">
        <View className="flex h-[50] w-full flex-row rounded-lg bg-neutral-300 px-2">
          <TouchableOpacity
            accessibilityRole="button"
            onPress={() => setShowExercises(!showExercises)}
            className="my-auto"
          >
            {showExercises ? (
              <Ionicons name="caret-down" size={18} color="#323232" className="my-auto" />
            ) : (
              <Ionicons name="caret-up" size={18} color="#323232" className="my-auto" />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityRole="button"
            onPress={() => editableWorkoutNavigate(editableWorkout.id, editableWorkout.name)}
          >
            <Text className="my-auto ml-2 font-bebas text-[16px] text-neutral-700">
              {editableWorkout.name}
            </Text>
          </TouchableOpacity>
        </View>
        {showExercises ? (
          <View className="flex w-full flex-col rounded-b-lg border-x border-b border-neutral-300 px-8">
            {editableWorkout.exercises.map((item) => {
              return (
                <TouchableOpacity
                  key={item}
                  onPress={() => {
                    editableExerciseNavigate(editableWorkout.id, editableWorkout.name, item);
                  }}
                  accessibilityRole="button"
                  className="flex h-[50] flex-row"
                >
                  <View className="my-auto">
                    <MaterialCommunityIcons name="circle" size={6} color="black" />
                  </View>
                  <Text className="my-auto ml-1 font-bebas text-[14px] text-neutral-700">
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default DrawerWorkoutBlock;
