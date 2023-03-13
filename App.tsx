import 'react-native-gesture-handler'; // MUST BE AT TOP
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { AuthProvider } from './src/contexts/AuthProvider';
import AuthNavigator from './src/screens/Auth/AuthNavigator';
import { supabase } from './src/utils/supabaseClient';
import DrawerNavigator from './src/screens/DrawerNavigator';
// import StorybookUI from './storybook';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  const [session, setSession] = useState<null | Session>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {!session ? (
            <Stack.Screen name="Auth" component={AuthNavigator} options={{ headerShown: false }} />
          ) : (
            <Stack.Screen
              name="Main"
              component={DrawerNavigator}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

// Uncomment Below to Open StorybookUI
// export default StorybookUI;

// Comment Below to Open StorybookUI
export default App;
