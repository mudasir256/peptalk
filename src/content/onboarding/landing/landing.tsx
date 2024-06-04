import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { styles } from "../../../common/theme/styles";
import { COLORS } from "../../../common/theme/colors";
import { OnboardingPager } from "./onboardingPager/onboardingPager";
import { SPACINGS } from "../../../common/theme/spacing";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoginStackRoutes } from "../../../common/navigation/routes";
import {
  ButtonTextPrimary,
  TextAlign,
  TextWeight,
} from "../../../common/theme/typography";
import { useTranslation } from "react-i18next";

export const LandingScreen = () => {
  const { t } = useTranslation();

  const { navigate } = useNavigation();
  const onLoginPress = () => navigate(LoginStackRoutes.Login);
  const onCreateAccountPress = () => navigate(LoginStackRoutes.Signup);

  return (
    <SafeAreaView style={[styles.flex, style.mainContainer]}>
      <OnboardingPager />
      <TouchableOpacity
        style={style.createButton}
        onPress={onCreateAccountPress}
      >
        <Text style={style.createButtonText}>
          {t("landingScreen.create a free account")}
        </Text>
      </TouchableOpacity>
      <View style={style.login}>
        <Text style={style.loginButtonOr}>Or</Text>
        <TouchableOpacity onPress={onLoginPress} style={style.loginButton}>
          <Text style={style.loginButtonText}> {t("landingScreen.login")}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.contrast,
  },
  loginButton: {
    ...TextAlign,
    marginLeft: SPACINGS.xxs,
  },
  loginButtonText: {
    color: COLORS.link,
    ...TextWeight,
  },
  loginButtonOr: {
    color: COLORS.text,
    ...TextWeight,
  },
  createButtonText: {
    ...ButtonTextPrimary,
  },
  createButton: {
    borderRadius: SPACINGS.Radius,
    backgroundColor: COLORS.secondary,
    marginHorizontal: SPACINGS.md,
    height: 50,
    marginTop: 28,
    ...styles.justifyCenter,
  },
  login: {
    ...styles.rowCenter,
    marginTop: 24,
    paddingVertical: SPACINGS.md,
  },
});
