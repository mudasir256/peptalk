import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';

const FontProvider = ({ children }) => {
  const [fontsLoaded, fontError] = useFonts({
    'Rubik-Black': require('../../../assets/fonts/Rubik-Black.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      console.log(fontsLoaded, 'font is loaded');
      console.log(fontError, 'error in loading fonts');
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return children;
};

export default FontProvider;
