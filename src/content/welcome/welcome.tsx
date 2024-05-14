import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { styles } from "../../common/theme/styles";
import { COLORS } from "../../common/theme/colors";
import { SPACINGS } from "../../common/theme/spacing";
import { useNavigation } from "@react-navigation/native";
import { WelcomePager } from "./welcomePager";
import { HomeStackRoutes } from "../../common/navigation/routes";
import Typography from "../../common/components/typography/typography";

export const WelcomeScreen = () => {
  const { navigate } = useNavigation();

  const onSkipPress = () => navigate(HomeStackRoutes.Home);

  return (
    <View style={[styles.flex, style.mainContainer]}>
      <View style={styles.flex}>
        <WelcomePager />
      </View>
      <TouchableOpacity style={style.skipButton} onPress={onSkipPress}>
        <Text style={style.createButtonText}>SKIP</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.contrast,
  },
  createButtonText: {
    textAlign: "center",
    color: COLORS.link,
    fontWeight: "500",
  },
  skipButton: {
    borderRadius: 25,
    backgroundColor: COLORS.contrast,
    marginHorizontal: SPACINGS.md,
    height: 50,
    marginBottom: 30,
    justifyContent: "flex-end",
  },
});
