import React from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import { styles } from "../../common/theme/styles";
import { COLORS } from "../../common/theme/colors";
import { SPACING } from "../../common/theme/spacing";
import { useNavigation } from "@react-navigation/native"
import { HomeStackRoutes } from "../../common/navigation/routes";
import { WelcomePager } from "./welcomePager";

export const WelcomeScreen = () => {
  const {navigate} = useNavigation()

  const onSkipPress = () => navigate(HomeStackRoutes.Home)

  return (
    <View style={[styles.flex, style.mainContainer]}>
      <WelcomePager/>
      <TouchableOpacity 
        style={style.createButton}
        onPress={onSkipPress}
      >
        <Text style={style.createButtonText}>SKIP</Text>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.contrast,    
  },
  createButtonText: {
    textAlign: "center",
    color: COLORS.link,
    fontWeight: '500',
    fontFamily: 'Rubik-Regular'
  },
  createButton:{
   borderRadius: 25,
   backgroundColor: COLORS.contrast,
   marginHorizontal: SPACING.md,
   height: 50, 
   marginBottom: 20,
   justifyContent: 'center'
  },
  
});
