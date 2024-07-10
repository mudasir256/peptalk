import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { headerOptions, noHeader } from "../../content/options";
import SignupScreen from "../../content/onboarding/signup";
import SignUpWithEmail from "../../content/onboarding/signupWithEmail";
import { LandingScreen } from "../../content/onboarding/landing/landing";
import { LoginStackRoutes } from "./routes";
import Footer from "../components/footer/footer";
import { useTranslation } from "react-i18next";
import Login from "../../content/onboarding/login/login";
import Forgotpassword from "../../content/onboarding/forgotPassword/forgotPassword";

const Stack = createStackNavigator();

const LoginStack = () => {
  const { t } = useTranslation();
  return (
    <Footer>
      <Stack.Navigator screenOptions={headerOptions}>
        <Stack.Screen
          name={LoginStackRoutes.Landing}
          component={LandingScreen}
          options={noHeader}
        />
        <Stack.Screen
          name={LoginStackRoutes.Signup}
          component={SignupScreen}
          options={noHeader}
        />
        <Stack.Screen
          name={LoginStackRoutes.SignUpWithEmail}
          component={SignUpWithEmail}
          options={{ title: t("loginStack.createAccount") }}
        />
        <Stack.Screen
          name={LoginStackRoutes.Login}
          component={Login}
          options={{ title: t("loginStack.loginAccount") }}
        />
        <Stack.Screen
          name={LoginStackRoutes.ForgotPassword}
          component={Forgotpassword}
          options={{ title: t("common.resetpassword") }}
        />
      </Stack.Navigator>
    </Footer>
  );
};

export default LoginStack;
