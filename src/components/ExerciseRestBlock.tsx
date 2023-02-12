import React from 'react';
import { Text, View } from 'react-native';

interface RestBlockProps {
  minutes: string;
  seconds: string;
}
const RestBlock: React.FC<RestBlockProps> = ({ minutes, seconds }) => {
  return (
    <View className="mx-2 mt-1 flex h-8 flex-row rounded-md bg-gray-200">
      <View className="bor h-8 w-10 rounded-l-lg bg-gray-300">
        <Text className="my-auto ml-1 font-bebas text-xl font-bold">REST</Text>
      </View>
      <Text className="my-auto ml-3 font-bebas text-xl font-bold">{minutes}</Text>
      <Text className="mt-3 font-bebas text-xs font-bold"> MINUTES</Text>
      <Text className="my-auto ml-3 font-bebas text-xl font-bold">{seconds}</Text>
      <Text className="mt-3 font-bebas text-xs font-bold"> SECONDS</Text>
    </View>
  );
};

export default RestBlock;