import React from 'react';
import { Text, Pressable, View, DevSettings } from 'react-native';

interface ErrorScreenProps {
    error: Error;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({ error }) => {
    
    // Refreshes JS
    const handleRestart = () => {
        DevSettings.reload()
    };

    return (
        <View className="bg-gray-100 flex h-full flex-col items-stretch items-center p-7 pt-20 ">
            <View className="my-2 w-full h-5/6 mt-0 bg-white rounded-xl p-8 items-center shadow-lg space-y-3">
                <Text className="text-center font-bebas text-6xl py-1">Oops!</Text>
                <Text className="text-center font-bebas text-2xl">We ran into an error.</Text>
                <View className="my-2 w-11/12 h-1/2 mt-0 bg-gray-200">
                    <Text className="p-2 text-1xl py-1">{error.message}</Text>
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