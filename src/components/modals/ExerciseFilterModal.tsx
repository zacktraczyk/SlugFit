import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import Checkbox from '../CustomCheckBox';

export interface ExerciseFilterModalProps {
  onClose: (filters: string[]) => void;
}

const PRIMARYFILTER = ['Chest', 'Back', 'Shoulders', 'Triceps', 'Biceps', 'Legs', 'Abdominals'];
const SECONDARYFILTER = [
  'Upper Chest',
  'Lower Chest',
  'Rhomboids',
  'Lat',
  'Lower Back',
  'Lower Abs',
  'Upper Abs',
  'Total Abs',
  'Obliques',
  'Hamstrings',
  'Quadriceps',
  'Calves',
  'Traps',
  'Rotator Cuff',
];

const ExerciseFilterModal: React.FC<ExerciseFilterModalProps> = ({ onClose }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPrimary, setSelectedPrimary] = useState(
    new Array(PRIMARYFILTER.length).fill(false)
  );
  const [selectedSecondary, setSelectedSecondary] = useState(
    new Array(SECONDARYFILTER.length).fill(false)
  );

  const styling = StyleSheet.create({
    modalMask: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
  });

  const onCloseHandler = () => {
    setModalVisible(!modalVisible);
    const filters: string[] = [];
    for (let i = 0; i < PRIMARYFILTER.length; i++) {
      if (selectedPrimary[i]) {
        filters.push(PRIMARYFILTER[i]);
      }
    }
    for (let i = 0; i < SECONDARYFILTER.length; i++) {
      if (selectedSecondary[i]) {
        filters.push(SECONDARYFILTER[i]);
      }
    }
    onClose(filters);
  };

  return (
    <View className="z-50 my-auto">
      <TouchableOpacity accessibilityRole="button" onPress={() => setModalVisible(true)}>
        <Ionicons name="filter-sharp" size={24} color="grey" />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styling.modalMask} className="h-full w-full items-center justify-center">
          <View className="flex h-4/6 w-10/12 flex-col rounded-lg border-2 border-slate-200 bg-white py-4 shadow-2xl">
            <View className="flex flex-row justify-end">
              <TouchableOpacity
                className="fixed m-2 mr-4"
                accessibilityRole="button"
                onPress={() => {
                  onCloseHandler();
                }}
              >
                <AntDesign name="close" size={20} color="grey" />
              </TouchableOpacity>
            </View>

            {/* Primary Filters */}
            <ScrollView>
              <View className=" ml-4 w-10/12 border-b border-slate-200 pb-2">
                <Text className="font-bebas text-lg font-bold">Primary:</Text>
              </View>
              <View className="mt-4 flex flex-row justify-between px-8">
                <View className="flex flex-1 flex-col">
                  {PRIMARYFILTER.slice(PRIMARYFILTER.length / 2, PRIMARYFILTER.length).map(
                    (item, index) => {
                      return (
                        <View key={item} className="mt-4 flex flex-grow flex-row justify-start">
                          <Checkbox
                            disable={false}
                            checked={selectedPrimary[index + PRIMARYFILTER.length / 2]}
                            onPress={() => {
                              setSelectedPrimary((prevArray) => {
                                const tempArray = [...prevArray];
                                tempArray[index + PRIMARYFILTER.length / 2] =
                                  !prevArray[index + PRIMARYFILTER.length / 2];
                                return tempArray;
                              });
                            }}
                          />
                          <Text className="my-auto ml-1 font-bebas">{item}</Text>
                        </View>
                      );
                    }
                  )}
                </View>
                <View className="flex flex-1 flex-col ">
                  {PRIMARYFILTER.slice(0, PRIMARYFILTER.length / 2).map((item, index) => {
                    return (
                      <View key={item} className="mt-4 flex flex-row justify-start">
                        <Checkbox
                          disable={false}
                          checked={selectedPrimary[index]}
                          onPress={() => {
                            setSelectedPrimary((prevArray) => {
                              const tempArray = [...prevArray];
                              tempArray[index] = !prevArray[index];
                              return tempArray;
                            });
                          }}
                        />
                        <Text className="my-auto ml-1 font-bebas">{item}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>

              {/* Secondary Filters */}
              <View className=" ml-4 mt-10 w-10/12 border-b border-slate-200  pb-2">
                <Text className="font-bebas text-lg">Secondary:</Text>
              </View>
              <View className="mt-4 flex flex-row justify-between px-8">
                <View className="flex flex-1 flex-col">
                  {SECONDARYFILTER.slice(SECONDARYFILTER.length / 2, SECONDARYFILTER.length).map(
                    (item, index) => {
                      return (
                        <View key={item} className="mt-4 flex flex-grow flex-row justify-start">
                          <Checkbox
                            disable={false}
                            checked={selectedSecondary[index + SECONDARYFILTER.length / 2]}
                            onPress={() => {
                              setSelectedSecondary((prevArray) => {
                                const tempArray = [...prevArray];
                                tempArray[index + SECONDARYFILTER.length / 2] =
                                  !prevArray[index + SECONDARYFILTER.length / 2];
                                return tempArray;
                              });
                            }}
                          />
                          <Text className="my-auto ml-1 font-bebas">{item}</Text>
                        </View>
                      );
                    }
                  )}
                </View>
                <View className="flex flex-1 flex-col">
                  {SECONDARYFILTER.slice(0, SECONDARYFILTER.length / 2).map((item, index) => {
                    return (
                      <View key={item} className="mt-4 flex flex-grow flex-row justify-start">
                        <Checkbox
                          disable={false}
                          checked={selectedSecondary[index]}
                          onPress={() => {
                            setSelectedSecondary((prevArray) => {
                              const tempArray = [...prevArray];
                              tempArray[index] = !prevArray[index];
                              return tempArray;
                            });
                          }}
                        />
                        <Text className="my-auto ml-1 font-bebas">{item}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ExerciseFilterModal;
