import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFonts, BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import Checkbox from './CustomCheckBox';

const ExerciseFilterModal = () => {
  const [modalVisible, setModalVisible] = useState(false);

  // Load font
  const [fontsLoaded] = useFonts({
    BebasNeue_400Regular,
  });


  return (
    <View className="my-auto">
      <TouchableOpacity accessibilityRole="button" onPress={() => setModalVisible(true)}>
        <Ionicons name="filter-sharp" size={24} color="grey" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="h-full w-full items-center justify-center">
          <View className="flex h-2/6 w-10/12 flex-col rounded-lg border border-slate-200 bg-white shadow-2xl pb-2 pt-2">
            <ScrollView>

            
              <View className="flex flex-row justify-end">
                <TouchableOpacity
                  className="m-2 mr-4"
                  accessibilityRole="button"
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <AntDesign name="close" size={20} color="grey" />
                </TouchableOpacity>
              </View>



              {/**Primary: Chest, Back, Shoulders, Abs, Legs */}
              <View className=" ml-4 w-5/12 border-b border-slate-200 pb-2">
                <Text className="font-bold font-bebas text-lg"> Primary:</Text>
              </View>

              <View className="flex flex-row justify-between mt-4">
                <View className="flex flex-row flex-grow justify-center">
                  <Text className="mr-2 font-bebas">Chest</Text>
                  <Checkbox checked={false} />
                </View>
                <View className="flex flex-row flex-grow justify-center">
                  <Text className="mr-2 font-bebas">Back</Text>
                  <Checkbox checked={false} />
                </View>
              </View>

              <View className="flex flex-row justify-between mt-4">
                <View className="flex flex-row flex-grow justify-center">
                  <Text className="mr-2 font-bebas">Shoulders</Text>
                  <Checkbox checked={false} />
                </View>
                <View className="flex flex-row flex-grow justify-center">
                  <Text className="mr-2 font-bebas">Biceps</Text>
                  <Checkbox checked={false} />
                </View>
              </View>

              <View className="flex flex-row justify-between mt-4">
                <View className="flex flex-row flex-grow justify-center">
                  <Text className="mr-2 font-bebas">Triceps</Text>
                  <Checkbox checked={false} />
                </View>
                <View className="flex flex-row flex-grow justify-center">
                  <Text className="mr-2 font-bebas">Abs</Text>
                  <Checkbox checked={false} />
                </View>
              </View>

              <View className="flex flex-row justify-between mt-4">
                <View className="flex flex-row flex-grow justify-center">
                  <Text className="mr-2 font-bebas">Legs</Text>
                  <Checkbox checked={false} />
                </View>
              </View>

              {/**Secondary:  
               * CHEST: Upper Chest, Lower Chest  
               * BACK: Rhomboids, Lat, Lowerback
               * ABS: Lower, Upper, Obliques, Upper, Total Abs
               * Legs: Hamstring, Quadriceps, Calves
               * Traps
               * Rotator Cuff
               * */}

              <View className=" ml-4 w-5/12 border-b border-slate-200 pb-2  mt-10">
                <Text className="font-bebas text-lg"> Secondary:</Text>
              </View>

              <View className="flex flex-row justify-between mt-4">
                <View className="flex flex-row flex-grow justify-center">
                  <Text className="mr-2 font-bebas">Upper Chest</Text>
                  <Checkbox checked={false} />
                </View>
                <View className="flex flex-row flex-grow justify-center">
                  <Text className="mr-2 font-bebas">Lower Chest</Text>
                  <Checkbox checked={false} />
                </View>
              </View>

              <View className="flex flex-row justify-between mt-4">
                <View className="flex flex-row flex-grow justify-center">
                  <Text className="mr-2 font-bebas">Rhomboids</Text>
                  <Checkbox checked={false} />
                </View>
                <View className="flex flex-row flex-grow justify-center">
                  <Text className="mr-2 font-bebas">Lat</Text>
                  <Checkbox checked={false} />
                </View>
              </View>

              <View className="flex flex-row justify-between mt-4">
                <View className="flex flex-row flex-grow justify-center">
                  <Text className="mr-2 font-bebas">Lower Back</Text>
                  <Checkbox checked={false} />
                </View>
                <View className="flex flex-row flex-grow justify-center">
                  <Text className="mr-2 font-bebas">Lower Abs</Text>
                  <Checkbox checked={false} />
                </View>
              </View>

              <View className="flex flex-row justify-between mt-4">
                <View className="flex flex-row flex-grow justify-center">
                  <Text className="mr-2 font-bebas">Upper Abs</Text>
                  <Checkbox checked={false} />
                </View>
                <View className="flex flex-row flex-grow justify-center">
                  <Text className="mr-2 font-bebas">Total Abs</Text>
                  <Checkbox checked={false} />
                </View>
              </View>

              <View className="flex flex-row justify-between mt-4">
                <View className="flex flex-row flex-grow justify-center">
                  <Text className="mr-2 font-bebas">Obliques</Text>
                  <Checkbox checked={false} />
                </View>
                <View className="flex flex-row flex-grow justify-center">
                  <Text className="mr-2 font-bebas">Hamstrings</Text>
                  <Checkbox checked={false} />
                </View>
              </View>

              <View className="flex flex-row justify-between mt-4">
                <View className="flex flex-row flex-grow justify-center">
                  <Text className="mr-2 font-bebas">Quadriceps</Text>
                  <Checkbox checked={false} />
                </View>
                <View className="flex flex-row flex-grow justify-center">
                  <Text className="mr-2 font-bebas">Calves</Text>
                  <Checkbox checked={false} />
                </View>
              </View>

              <View className="flex flex-row justify-between mt-4">
                <View className="flex flex-row flex-grow justify-center">
                  <Text className="mr-2 font-bebas">Traps</Text>
                  <Checkbox checked={false} />
                </View>
                <View className="flex flex-row flex-grow justify-center">
                  <Text className="mr-2 font-bebas">Rotator Cuffs</Text>
                  <Checkbox checked={false} />
                </View>
              </View>

              



            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
});

export default ExerciseFilterModal;
