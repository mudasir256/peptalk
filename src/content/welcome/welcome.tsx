import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { styles } from "../../common/theme/styles";
import { COLORS } from "../../common/theme/colors";
import { SPACINGS } from "../../common/theme/spacing";
import { useNavigation } from "@react-navigation/native";
import { WelcomePager } from "./welcomePager";
import { HomeStackRoutes } from "../../common/navigation/routes";
import { TextAlign, TextWeight } from "../../common/theme/typography";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setOnboarding } from "../../common/store/slice/authentication/slice";

export const WelcomeScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onSkipPress = () => {
    dispatch(setOnboarding(true));
    navigation.reset({
      index: 0,
      routes: [{ name: HomeStackRoutes.Home }],
    });
  };

  return (
    <View style={[styles.flex, style.mainContainer]}>
      <View style={styles.flex}>
        <WelcomePager />
      </View>
      <TouchableOpacity style={style.skipButton} onPress={onSkipPress}>
        <Text style={style.createButtonText}>{t("welcomeScreen.skip")}</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.contrast,
  },
  createButtonText: {
    color: COLORS.link,
    ...TextAlign,
    ...TextWeight,
  },
  skipButton: {
    borderRadius: SPACINGS.Radius,
    backgroundColor: COLORS.contrast,
    marginHorizontal: SPACINGS.md,
    ...styles.end,
    height: 50,
    marginBottom: 30,
  },
});
