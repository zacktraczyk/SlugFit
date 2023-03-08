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
    <View className="flex h-full flex-col items-stretch bg-gray-100 p-7 pt-20 ">
      <View className="my-2 mt-0 h-5/6 w-full items-center space-y-3 rounded-xl bg-white p-8 shadow-lg">
        <Text className="py-1 text-center font-bebas text-6xl">Oops!</Text>
        <Text className="text-center font-bebas text-2xl">We ran into an error.</Text>
        <View className="my-2 mt-0 h-1/2 w-11/12 bg-gray-200">
          <Text className="text-1xl p-2 py-1">{error.message}</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityHint="Login to application"
          className="my-2 mt-0 w-60 rounded-lg bg-red-500 p-2"
          onPress={handleRestart}
        >
          <Text className="text-center font-bebas text-2xl text-white">Restart The App</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ErrorScreen;
