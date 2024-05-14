import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { styles } from "../../../common/theme/styles";
import { IMAGES } from "../../../assets/images";

export const WelcomePage = () => (
  <View style={[style.container, styles.flexCenter]}>
    <Image
      source={IMAGES.pageOneBg}
      resizeMode="contain"
      style={{
        width: "100%",
        height: "100%",
      }}
    />
    <Image source={IMAGES.title} resizeMode="contain" style={style.title} />
  </View>
);

const style = StyleSheet.create({
  container: {
    overflow: "hidden",
    aspectRatio: 0.7,
  },
  title: {
    position: "absolute",
    top: 20,
    width: 170,
    aspectRatio: 1,
    alignSelf: "center",
  },
});
