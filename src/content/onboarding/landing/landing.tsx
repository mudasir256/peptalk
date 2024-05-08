import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { styles } from "../../../common/theme/styles";
import { COLORS } from "../../../common/theme/colors";
import { OnboardingPager } from "./onboardingPager/onboardingPager";
import { SPACINGS } from "../../../common/theme/spacing";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoginStackRoutes } from "../../../common/navigation/routes";

export const LandingScreen = () => {
  const { navigate } = useNavigation()
  const onLoginPress = () => { }
  const onCreateAccountPress = () => navigate(LoginStackRoutes.Signup)

  return (
    <SafeAreaView style={[styles.flex, style.mainContainer]}>
      <OnboardingPager />
      <TouchableOpacity
        style={style.createButton}
        onPress={onCreateAccountPress}
      >
        <Text style={style.createButtonText}>Create a free account</Text>
      </TouchableOpacity>
      <View style={style.login}>
        <Text style={style.loginButtonOr}>Or</Text >
        <TouchableOpacity
          onPress={onLoginPress}
          style={style.loginButton}
        >
          <Text style={style.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.contrast,
  },
  loginButton: {
    textAlign: "center",
    marginLeft: SPACINGS.xxs
  },
  loginButtonText: {
    color: COLORS.link,
    fontWeight: '500',
  },
  loginButtonOr: {
    color: COLORS.text,
    fontWeight: '500',
  },
  createButtonText: {
    textAlign: "center",
    color: COLORS.text,
    fontWeight: '500',
    fontFamily: 'Rubik-Regular'
  },
  createButton: {
    borderRadius: 25,
    backgroundColor: COLORS.secondary,
    marginHorizontal: SPACINGS.md,
    height: 50,
    marginTop: 28,
    justifyContent: 'center'
  },
  login: {
    ...styles.rowCenter,
    marginTop: 24,
    paddingVertical: SPACINGS.md,
  },

});
