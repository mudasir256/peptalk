import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { headerOptions, noHeader } from "../../content/options";
import { HomeStackRoutes } from "./routes";
import Footer from "../components/footer/footer";
import { useTranslation } from "react-i18next";
import About from "../../content/settings/settingScreens/about";
import Contact from "../../content/settings/settingScreens/contact";
import Password from "../../content/settings/settingScreens/password";
import TermsOfUse from "../../content/settings/settingScreens/termsOfUse";
import SettingsScreen from "../../content/settings/settings";
import ResetPasswordWithEmail from "../../content/settings/settingScreens/resetPasswordWithEmail";

const Stack = createStackNavigator();

const SettingStack = () => {
  const { t } = useTranslation();
  return (
    <Footer>
      <Stack.Navigator
        screenOptions={headerOptions}
        initialRouteName={HomeStackRoutes.Settings}
      >
        <Stack.Screen
          name={HomeStackRoutes.Settings}
          component={SettingsScreen}
          options={noHeader}
        />
        <Stack.Screen
          name={HomeStackRoutes.TermsOfUse}
          component={TermsOfUse}
          options={noHeader}
        />
        <Stack.Screen
          name={HomeStackRoutes.About}
          component={About}
          options={noHeader}
        />
        <Stack.Screen
          name={HomeStackRoutes.Contact}
          component={Contact}
          options={noHeader}
        />
        <Stack.Screen
          name={HomeStackRoutes.Password}
          component={Password}
          options={noHeader}
        />
        <Stack.Screen
          name={HomeStackRoutes.ResetPasswordWithEmail}
          component={ResetPasswordWithEmail}
          options={noHeader}
        />
      </Stack.Navigator>
    </Footer>
  );
};

export default SettingStack;
