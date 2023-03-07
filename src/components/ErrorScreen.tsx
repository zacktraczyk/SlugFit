import React from 'react';
import { Text, Pressable, View, DevSettings } from 'react-native';

interface ErrorScreenProps {
  error: Error;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({ error }) => {
  // Refreshes JS
  const handleRestart = () => {
    DevSettings.reload();
  };

  return (
    <View className="bg-gray-100 flex h-full flex-col items-stretch p-7 pt-20 ">
      <View className="bg-white my-2 mt-0 h-5/6 w-full items-center space-y-3 rounded-xl p-8 shadow-lg">
        <Text className="py-1 text-center font-bebas text-6xl">Oops!</Text>
        <Text className="text-center font-bebas text-2xl">We ran into an error.</Text>
        <View className="bg-gray-200 my-2 mt-0 h-1/2 w-11/12">
          <Text className="text-1xl p-2 py-1">{error.message}</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityHint="Login to application"
          className="bg-red-500 my-2 mt-0 w-60 rounded-lg p-2"
          onPress={handleRestart}
        >
          <Text className="text-white text-center font-bebas text-2xl">Restart The App</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ErrorScreen;
