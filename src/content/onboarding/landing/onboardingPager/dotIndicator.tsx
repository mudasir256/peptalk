import React from "react"
import {View, ViewStyle, StyleSheet} from "react-native"
import { styles } from "../../../../common/theme/styles"


type Props = {
  currentIndex: number
  count: number
  containerStyle?: ViewStyle
}

export const DotIndicator = ({currentIndex, count, containerStyle}: Props) => {
  return (
    <View style={[styles.row, containerStyle]}>
    {Array.from({ length: count }).map((_, index) => (
      <View
        key={index}
        style={[
          style.dot,
          index === currentIndex ? style.activeDot : null,
        ]}
      />))
    }
    </View>
  )
}

const style = StyleSheet.create({
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'gray',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#2edfdf',
    width: 13,
    height: 13,
    borderRadius: 8,
  },
})