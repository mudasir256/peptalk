import React from "react";
import MainNavigator from "../common/navigation/mainNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";

const SplashScreen = ({ navigation }) => {
  return (
    <SafeAreaProvider>
      <MainNavigator />
    </SafeAreaProvider>
  );
};

export default SplashScreen;
