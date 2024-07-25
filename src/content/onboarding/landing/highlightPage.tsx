import React from "react";
import {
  View,
  Image,
  StyleSheet,
  ImageRequireSource,
  Text,
  ImageResizeMode,
} from "react-native";
import { styles } from "../../../common/theme/styles";
import { COLORS } from "../../../common/theme/colors";
import {
  PrimaryFont,
  PrimaryText,
  TextAlign,
} from "../../../common/theme/typography";

type Props = {
  title?: string;
  image: ImageRequireSource;
  detail: string;
  imageStyle?: object;
  detailStyle?: object;
  resizeMode?: ImageResizeMode;
};

export const HighlightPage = ({
  title = undefined,
  image,
  detail,
  imageStyle,
  detailStyle,
  resizeMode = "contain",
}: Props) => (
  <View style={[styles.flex, style.container]}>
    {title && <Text style={style.title}>{title}</Text>}
    <View style={[style.imageContainer]}>
      <Image
        source={image}
        resizeMode={resizeMode}
        style={[style.image, imageStyle]}
      />
    </View>
    <Text style={[style.detail, detailStyle]}>{detail}</Text>
  </View>
);

const style = StyleSheet.create({
  container: {
    ...styles.flexCenter,
  },
  title: {
    ...PrimaryFont,
    color: COLORS.text,
    marginTop: 25,
  },
  detail: {
    ...PrimaryText,
    ...TextAlign,
    color: COLORS.text,
    marginHorizontal: 32,
    marginBottom: 42,
    textAlign: "center",
  },
  imageContainer: {
    width: "100%",
    ...styles.center,
  },
  image: {
    // backgroundColor: "red",
  },
});
