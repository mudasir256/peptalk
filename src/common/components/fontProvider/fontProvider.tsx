import React, { useEffect } from "react";
import { useFonts } from "expo-font";

const FontProvider = ({ children }) => {
  const [fontsLoaded, fontError] = useFonts({
    "SF-Pro-Text-Bold": require("../../../assets/fonts/SF-Pro-Text-Bold.otf"),
    "SF-Pro-Text-Light": require("../../../assets/fonts/SF-Pro-Text-Light.otf"),
    "SF-Pro-Text-Medium": require("../../../assets/fonts/SF-Pro-Text-Medium.otf"),
    "SF-Pro-Text-Regular": require("../../../assets/fonts/SF-Pro-Text-Regular.otf"),
    "SF-Pro-Text-Semibold": require("../../../assets/fonts/SF-Pro-Text-Semibold.otf"),
    "SF-Pro": require("../../../assets/fonts/SF-Pro.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      console.log(fontsLoaded, "font is loaded");
      console.log(fontError, "error in loading fonts");
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return children;
};

export default FontProvider;
