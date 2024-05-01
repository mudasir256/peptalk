import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { headerOptions, noHeader } from '../../content/options';
import LandingScreen from '../../content/onboarding/landing';
import onboardWelcome from '../../content/welcome';
import SignupScreen from '../../content/onboarding/signup';
import SignUpWithEmail from '../../content/onboarding/signupWithEmail';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={headerOptions}>
        <Stack.Screen name="landing" component={LandingScreen} options={noHeader} />
        <Stack.Screen name="signup" component={SignupScreen} options={{ headerShadowVisible: false }} />
        <Stack.Screen name="signupWithEmail" component={SignUpWithEmail} />
        <Stack.Screen name="onboardWelcome" component={onboardWelcome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default MainNavigator;
