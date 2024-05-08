import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Alert, Button, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HomeStackRoutes, LoginStackRoutes } from "./routes";
import { COLORS } from "../theme/colors";
import { WelcomeScreen } from "../../content/welcome/welcome";
import { noHeader } from "../../content/options";
import CameraScreen from "../../content/camera/camera";
import FoldersScreen from "../../content/folders/folders";
import SettingsScreen from "../../content/settings/settings";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import SearchStack from "./searchStack";
import HomeScreen from "../../content/home/home";
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
            navigation.navigate(LoginStackRoutes.Login)
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
          headerTintColor: "#ffffff",
          tabBarStyle: { backgroundColor: COLORS.primary, },
          tabBarActiveTintColor: "#ffffff",
        })}
      >
        <BottomTab.Screen
          name={HomeStackRoutes.HomeTab}
          component={HomeScreen}
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
                <Ionicons name="log-out" size={24} color="white" />
              </TouchableOpacity>
            ),
          })}
        />
        <BottomTab.Screen
          name=" "
          component={SearchStack}
          // component={HomeScreen}
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
                <Button
                  onPress={() => alert('This is a button!')}
                  title="Pep Talk"
                  color={COLORS.text}
                />
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
                <Button
                  onPress={() => alert('This is a button!')}
                  title="Pep Talk"
                  color={COLORS.text}
                />
              </TouchableOpacity>
            ),
          })}
        />
        <BottomTab.Screen
          name={"folder"}
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
                <Button
                  onPress={() => alert('This is a button!')}
                  title="Pep Talk"
                  color={COLORS.text}
                />
              </TouchableOpacity>
            ),
          })}
        />
        <BottomTab.Screen
          name={HomeStackRoutes.Settings}
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
                <Button
                  onPress={() => alert('This is a button!')}
                  title="Pep Talk"
                  color={COLORS.text}
                />
              </TouchableOpacity>
            ),
          })}
        />
      </BottomTab.Navigator>
    </BottomSheetModalProvider>
  );
};

const HomeStack = () => (
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

export default HomeStack;

