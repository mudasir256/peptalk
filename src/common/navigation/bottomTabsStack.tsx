import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { HomeStackRoutes } from "./routes";
import { COLORS } from "../theme/colors";
import { WelcomeScreen } from "../../content/welcome/welcome";
import { noHeader } from "../../content/options";
import CameraScreen from "../../content/camera/camera";
import SettingsScreen from "../../content/settings/settings";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Logo } from "../../assets/svgs/svgIcons";
import HomeStack from "./HomeStack";
import { useTranslation } from "react-i18next";
import About from "../../content/settings/settingScreens/about";
import Contact from "../../content/settings/settingScreens/contact";
import TermsOfUse from "../../content/settings/settingScreens/termsOfUse";
import FoldersScreen from "../../content/folders/folders";
const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { t } = useTranslation();

  return (
    <BottomSheetModalProvider>
      <BottomTab.Navigator
        screenOptions={() => ({
          headerStyle: { backgroundColor: COLORS.primary },
          headerTintColor: COLORS.white,
          tabBarStyle: { backgroundColor: COLORS.primary },
          tabBarActiveTintColor: COLORS.white,
        })}
      >
        <BottomTab.Screen
          name=" "
          component={HomeStack}
          options={() => ({
            tabBarLabel: t("bottomTab.home"),
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
            headerRight: () => (
              <TouchableOpacity style={{ marginRight: 10 }}>
                <Logo />
              </TouchableOpacity>
            ),
          })}
        />
        <BottomTab.Screen
          name={HomeStackRoutes.Camera}
          component={CameraScreen}
          options={() => ({
            tabBarLabel: t("bottomTab.camera"),
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="camera" size={size} color={color} />
            ),
            headerRight: () => (
              <TouchableOpacity style={{ marginRight: 10 }}>
                <Logo />
              </TouchableOpacity>
            ),
          })}
        />
        <BottomTab.Screen
          name={"    "}
          component={FoldersScreen}
          options={() => ({
            tabBarLabel: t("bottomTab.folders"),
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="folder" size={size} color={color} />
            ),
            headerRight: () => (
              <TouchableOpacity style={{ marginRight: 10 }}>
                <Logo />
              </TouchableOpacity>
            ),
          })}
        />
        <BottomTab.Screen
          name={"  "}
          component={SettingsScreen}
          options={() => ({
            tabBarLabel: t("bottomTab.settings"),
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings" size={size} color={color} />
            ),
            headerRight: () => (
              <TouchableOpacity style={{ marginRight: 10 }}>
                <Logo />
              </TouchableOpacity>
            ),
          })}
        />
      </BottomTab.Navigator>
    </BottomSheetModalProvider>
  );
};

const mainStack = () => (
  <Stack.Navigator initialRouteName={HomeStackRoutes.Welcome}>
    <Stack.Screen
      name={HomeStackRoutes.Welcome}
      component={WelcomeScreen}
      options={noHeader}
    />
    <Stack.Screen
      name={HomeStackRoutes.Home}
      component={BottomTabNavigator}
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
  </Stack.Navigator>
);

export default mainStack;
