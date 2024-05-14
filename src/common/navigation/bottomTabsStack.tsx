import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Alert, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HomeStackRoutes, LoginStackRoutes } from "./routes";
import { COLORS } from "../theme/colors";
import { WelcomeScreen } from "../../content/welcome/welcome";
import { noHeader } from "../../content/options";
import CameraScreen from "../../content/camera/camera";
import FoldersScreen from "../../content/folders/folders";
import SettingsScreen from "../../content/settings/settings";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Logo } from "../../assets/svgs/svgIcons";
import HomeStack from "./homeStack";
const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const navigation = useNavigation();
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: () => {
            navigation.navigate(LoginStackRoutes.Login);
          },
        },
      ],
      { cancelable: false }
    );
  };

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
            tabBarLabel: "HOME",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
            headerRight: () => (
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={handleLogout}
              >
                <Logo />
              </TouchableOpacity>
            ),
          })}
        />
        <BottomTab.Screen
          name={HomeStackRoutes.Camera}
          component={CameraScreen}
          options={() => ({
            tabBarLabel: "Camera",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="camera" size={size} color={color} />
            ),
            headerRight: () => (
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={handleLogout}
              >
                <Logo />
              </TouchableOpacity>
            ),
          })}
        />
        <BottomTab.Screen
          name={"    "}
          component={FoldersScreen}
          options={() => ({
            tabBarLabel: "Folders",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="folder" size={size} color={color} />
            ),
            headerRight: () => (
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={handleLogout}
              >
                <Logo />
              </TouchableOpacity>
            ),
          })}
        />
        <BottomTab.Screen
          name={"  "}
          component={SettingsScreen}
          options={() => ({
            tabBarLabel: "Setting",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings" size={size} color={color} />
            ),
            headerRight: () => (
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={handleLogout}
              >
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
  </Stack.Navigator>
);

export default mainStack;
