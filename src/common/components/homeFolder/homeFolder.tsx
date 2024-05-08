import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { IMAGES } from '../../../assets/images'
import { styles } from '../../theme/styles';
import { COLORS } from '../../theme/colors';
import { SPACINGS } from '../../theme/spacing';
import BouncyCheckbox from 'react-native-bouncy-checkbox/build/dist/BouncyCheckbox';


const HomeFolder = ({ name }) => {
  return (
    <View style={style.head}>
      <View style={style.folder}>
        <Image source={IMAGES.folder} />
        <Text style={style.move}>{name}</Text>
      </View>
      <BouncyCheckbox
        size={24}
        fillColor={"black"}
        iconStyle={{ borderColor: COLORS.text }}
        innerIconStyle={style.checkbox}
        textStyle={{}}
      />
    </View>
  )
}

export default HomeFolder

const style = StyleSheet.create({
  head: {
    ...styles.flexRow,
    marginVertical: SPACINGS.md
  },
  folder: {
    ...styles.rowCenter,
  },
  move: {
    marginLeft: 5,
    fontSize: 17,
    fontWeight: "400",
    lineHeight: 22,
    color: COLORS.text
  },
  checkbox: {
    borderRadius: 4,
    borderColor: COLORS.text,
    borderWidth: 2,
    backgroundColor: "white",
    // marginLeft: SPACINGS.lg,
  },

})