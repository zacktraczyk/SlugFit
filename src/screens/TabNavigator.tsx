import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicon from '@expo/vector-icons/Ionicons';
import HomeStack from './Home/HomeStack';
import MyWorkoutsStack from './MyWorkouts/MyWorkoutsStack';
import Profile from './Profile/Profile';
import { NavigatorParamList } from './DrawerNavigator';

const Tabs = createBottomTabNavigator<NavigatorParamList>();

function TabNavigator() {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicon.glyphMap = 'home-outline';
          switch (route.name) {
            case 'HomeStack':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'MyWorkoutsStack':
              iconName = focused ? 'barbell' : 'barbell-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person-circle' : 'person-circle-outline';
              break;
          }
          return <Ionicon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#000000',
        tabBarShowLabel: false,
      })}
    >
      <Tabs.Screen name="HomeStack" component={HomeStack} options={{ headerShown: false }} />
      <Tabs.Screen
        name="MyWorkoutsStack"
        component={MyWorkoutsStack}
        options={{ headerShown: false }}
      />
      <Tabs.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
    </Tabs.Navigator>
  );
}

export default TabNavigator;
