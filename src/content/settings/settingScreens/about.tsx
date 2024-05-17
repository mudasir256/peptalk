import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
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
import { IMAGES } from "../../../assets/images";
import { styles } from "../../../common/theme/styles";
import { useTranslation } from "react-i18next";

const About = () => {
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
        <Text style={style.title}>{t("settingsScreen.aboutMomBrain")}</Text>
      </View>
      <View style={style.imgContainer}>
        <Image source={IMAGES.illustration6} style={style.img1} />
        <Image source={IMAGES.illustration7} style={style.img2} />
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

export default About;

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
  imgContainer: {
    padding: SPACINGS.md,
    ...styles.center,
  },
  img1: {
    position: "absolute",
    top: 25,
    zIndex: 1,
    height: 53,
    width: 85,
  },
  img2: {
    height: 83,
    width: 145,
  },
});
