import React from "react";
import {
  View,
  Image,
  StyleSheet,
  ImageRequireSource,
  Text,
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
};

export const HighlightPage = ({
  title = undefined,
  image,
  detail,
  imageStyle,
  detailStyle,
}: Props) => (
  <View style={[styles.flex, style.container]}>
    {title && <Text style={style.title}>{title}</Text>}
    <View style={[style.imageContainer]}>
      <Image
        source={image}
        resizeMode="contain"
        style={[style.image, imageStyle]}
      />
    </View>
    <Text style={[style.detail, detailStyle]}>{detail}</Text>
  </View>
);

const style = StyleSheet.create({
  container: {
    ...styles.center,
    overflow: "hidden",
  },
  title: {
    color: COLORS.text,
    ...PrimaryFont,
    marginTop: 20,
    marginBottom: 12,
  },
  detail: {
    ...TextAlign,
    ...PrimaryText,
    color: COLORS.text,
    marginHorizontal: 32,
  },
  imageContainer: {
    width: "100%",
    marginHorizontal: 30,
    ...styles.aspectRatio,
    ...styles.center,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
