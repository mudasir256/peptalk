import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { headerOptions, noHeader } from '../../content/options';
import SignupScreen from '../../content/onboarding/signup';
import SignUpWithEmail from '../../content/onboarding/signupWithEmail';
import { LandingScreen } from '../../content/onboarding/landing/landing';
import { LoginStackRoutes } from './routes';


const Stack = createStackNavigator();

const LoginStack = () => {
  return (
      <Stack.Navigator screenOptions={headerOptions}>
        <Stack.Screen name={LoginStackRoutes.Landing} component={LandingScreen} options={noHeader} />
        <Stack.Screen name={LoginStackRoutes.Signup} component={SignupScreen} options={noHeader} />
        <Stack.Screen name={LoginStackRoutes.SignUpWithEmail} component={SignUpWithEmail} />
      </Stack.Navigator>
  );
}


export default LoginStack;
