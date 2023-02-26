import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import Checkbox from './CustomCheckBox';

export type ExerciseFilterModalProps = {
  onClose: (filters: string[] | undefined) => void;
};

const PRIMARYFILTER = ['Chest', 'Back', 'Shoulders', 'Triceps', 'Biceps', 'Legs', 'Abs'];
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
  ' Rotator Cuff',
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
    <View className="my-auto">
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
          <View className="flex h-4/6 w-10/12 flex-col rounded-lg border border-2 border-slate-200 bg-white py-4 shadow-2xl">
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
            {/**Primary*/}
            <ScrollView>
              <View className=" ml-4 w-10/12 border-b border-slate-200 pb-2">
                <Text className="font-bebas text-lg font-bold">Primary:</Text>
              </View>
              <View className="mt-4 flex flex-row justify-between px-8">
                <View className="flex flex-grow flex-col">
                  {PRIMARYFILTER.slice(
                    parseInt(PRIMARYFILTER.length / 2),
                    PRIMARYFILTER.length
                  ).map((item, index) => {
                    return (
                      <View key={item} className="mt-4 flex flex-grow flex-row justify-start">
                        <Text className="my-auto mr-2 font-bebas">{item}</Text>
                        <Checkbox
                          checked={selectedPrimary[index + parseInt(PRIMARYFILTER.length / 2)]}
                          onPress={() => {
                            setSelectedPrimary((prevArray) => {
                              const tempArray = [...prevArray];
                              tempArray[index + parseInt(PRIMARYFILTER.length / 2)] =
                                !prevArray[index + parseInt(PRIMARYFILTER.length / 2)];
                              return tempArray;
                            });
                          }}
                        />
                      </View>
                    );
                  })}
                </View>
                <View className="flex flex-grow flex-col ">
                  {PRIMARYFILTER.slice(0, parseInt(PRIMARYFILTER.length / 2)).map((item, index) => {
                    return (
                      <View key={item} className="mt-4 flex flex-grow flex-row justify-start">
                        <Text className="my-auto mr-2 font-bebas">{item}</Text>
                        <Checkbox
                          checked={selectedPrimary[index]}
                          onPress={() => {
                            setSelectedPrimary((prevArray) => {
                              const tempArray = [...prevArray];
                              tempArray[index] = !prevArray[index];
                              return tempArray;
                            });
                          }}
                        />
                      </View>
                    );
                  })}
                </View>
              </View>
              {/**Secondary: */}
              <View className=" ml-4 mt-10 w-10/12 border-b border-slate-200  pb-2">
                <Text className="font-bebas text-lg">Secondary:</Text>
              </View>
              <View className="mt-4 flex flex-row justify-between px-8">
                <View className="flex flex-grow flex-col">
                  {SECONDARYFILTER.slice(
                    parseInt(SECONDARYFILTER.length / 2),
                    SECONDARYFILTER.length
                  ).map((item, index) => {
                    return (
                      <View key={item} className="mt-4 flex flex-grow flex-row justify-start">
                        <Text className="my-auto mr-2 font-bebas">{item}</Text>
                        <Checkbox
                          checked={selectedSecondary[index + parseInt(SECONDARYFILTER.length / 2)]}
                          onPress={() => {
                            setSelectedSecondary((prevArray) => {
                              const tempArray = [...prevArray];
                              tempArray[index + parseInt(SECONDARYFILTER.length / 2)] =
                                !prevArray[index + parseInt(SECONDARYFILTER.length / 2)];
                              return tempArray;
                            });
                          }}
                        />
                      </View>
                    );
                  })}
                </View>
                <View className="flex flex-grow flex-col ">
                  {SECONDARYFILTER.slice(0, parseInt(SECONDARYFILTER.length / 2)).map(
                    (item, index) => {
                      return (
                        <View key={item} className="mt-4 flex flex-grow flex-row justify-start">
                          <Text className="my-auto mr-2 font-bebas">{item}</Text>
                          <Checkbox
                            checked={selectedSecondary[index]}
                            onPress={() => {
                              setSelectedSecondary((prevArray) => {
                                const tempArray = [...prevArray];
                                tempArray[index] = !prevArray[index];
                                return tempArray;
                              });
                            }}
                          />
                        </View>
                      );
                    }
                  )}
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
