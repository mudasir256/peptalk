import React from "react";
import {View, Image, StyleSheet} from "react-native"
import { styles } from "../../../common/theme/styles";
import { IMAGES } from "../../../assets/images";

export const WelcomePage = () => (
  <View style={[style.container, styles.flexCenter]}>
    <Image source={IMAGES.pageOneBg} resizeMode="cover" style={{aspectRatio: 1, justifyContent: 'flex-end', marginTop: 0 }}/>
    <Image source={IMAGES.title} resizeMode="contain" style={style.title}/>
  </View>
)

const style = StyleSheet.create({
  container: {
    overflow: 'hidden'
  },
  title: {
    position: 'absolute',
    top: 0,
    width: 170,
    aspectRatio: 1,
    alignSelf: 'center',
  }
})