import React from "react";
import { Button, Text, View } from "react-native";
import { supabase } from "../utils/supabaseClient";

function Home() {
  return (
    <View>
      <Text>Home Page yay</Text>
      <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
    </View>
  );
}

export default Home;
