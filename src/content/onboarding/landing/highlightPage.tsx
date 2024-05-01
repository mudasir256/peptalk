import React from "react";
import {View, Image, StyleSheet, ImageRequireSource, Text, ViewStyle, TextStyle} from "react-native"
import { styles } from "../../../common/theme/styles";
import { IMAGES } from "../../../assets/images";
import { COLORS } from "../../../common/theme/colors";

type Props = {
  title?: string
  image: ImageRequireSource
  detail: string
  detailStyle?: TextStyle
}

export const HighlightPage = ({title = undefined, image, detail, detailStyle = undefined}: Props) => (
  <View style={[styles.flex, style.container]}>
    {title && <Text style={style.title}>{title}</Text>}
    <View style={style.imageContainer}>
      <Image source={image} resizeMode="contain" style={style.image} />
    </View>
    <Text style={[style.detail, detailStyle]}>{detail}</Text>
  </View>
)

const style = StyleSheet.create({
  container: {
    ...styles.center,
    overflow: 'hidden'
  },
  title: {
    color: COLORS.text,
    fontSize: 34,
    marginTop: 20,
    marginBottom: 12
  },
  detail: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 20,
    marginHorizontal: 32,
    color: COLORS.text,
  },
  imageContainer: {
    width: '90%',
    marginHorizontal: 30,
    aspectRatio: 1,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
})