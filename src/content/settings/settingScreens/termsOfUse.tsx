import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS } from "../../../common/theme/colors";
import { SPACINGS } from "../../../common/theme/spacing";
import {
  ButtonTextPrimary,
  SecondaryText,
  mainTitle,
} from "../../../common/theme/typography";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const TermsOfUse = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <View style={style.head}>
        <TouchableOpacity style={style.back} onPress={goBack}>
          <Ionicons name="chevron-back" size={24} color="black" />
          <Text style={style.backbtn}>{t("common.back")}</Text>
        </TouchableOpacity>
        <Text style={style.title}>{t("settingsScreen.terms")}</Text>
      </View>
      <Text style={style.description}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
        fugit aspernatur voluptate ullam! Culpa animi rerum aut cum, tenetur
        magni voluptatem necessitatibus quam qui illum recusandae excepturi
        dolore at? Harum? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Consequatur fugit aspernatur voluptate ullam! Culpa animi rerum
        aut cum, tenetur magni voluptatem necessitatibus quam qui illum
        recusandae excepturi dolore at? Harum?
      </Text>
    </>
  );
};

export default TermsOfUse;

const style = StyleSheet.create({
  head: {
    borderBottomRightRadius: SPACINGS.Radius,
    borderBottomLeftRadius: SPACINGS.Radius,
    backgroundColor: COLORS.header,
    padding: SPACINGS.md,
  },
  title: {
    ...mainTitle,
    marginTop: SPACINGS.xl,
  },
  back: {
    flexDirection: "row",
    alignItems: "center",
  },
  backbtn: {
    ...ButtonTextPrimary,
    marginLeft: 5,
  },
  description: {
    padding: SPACINGS.md,
    ...SecondaryText,
  },
});
