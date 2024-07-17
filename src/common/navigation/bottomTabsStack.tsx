import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { HomeStackRoutes } from "./routes";
import { COLORS } from "../theme/colors";
import { WelcomeScreen } from "../../content/welcome/welcome";
import { noHeader } from "../../content/options";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Logo } from "../../assets/svgs/svgIcons";
import HomeStack from "./HomeStack";
import { useTranslation } from "react-i18next";
import FolderStack from "./folderStack";
import CameraStack from "./cameraStack";
import SettingStack from "./SettingStack";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
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
          name={HomeStackRoutes.HomeTab}
          component={HomeStack}
          options={() => ({
            tabBarLabel: t("bottomTab.home"),
            headerTitle: "",
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
          component={CameraStack}
          options={() => ({
            tabBarLabel: t("bottomTab.camera"),
            headerTitle: "",
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
          name={HomeStackRoutes.Folder}
          component={FolderStack}
          options={() => ({
            tabBarLabel: t("bottomTab.folders"),
            headerTitle: "",
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
          component={SettingStack}
          options={() => ({
            tabBarLabel: t("bottomTab.settings"),
            headerTitle: "",
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

const mainStack = () => {
  const onboarding = useSelector(
    (state: any) => state.authentication.onboarding
  );
  return (
    <Stack.Navigator
      initialRouteName={
        onboarding ? HomeStackRoutes.Home : HomeStackRoutes.Welcome
      }
    >
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
    </Stack.Navigator>
  );
};

export default mainStack;
