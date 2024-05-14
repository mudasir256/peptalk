import React from "react";
import { View, ViewStyle, StyleSheet } from "react-native";
import { styles } from "../../../../common/theme/styles";
import { COLORS } from "../../../../common/theme/colors";

type Props = {
  currentIndex: number;
  count: number;
  containerStyle?: ViewStyle;
};

export const DotIndicator = ({
  currentIndex,
  count,
  containerStyle,
}: Props) => {
  return (
    <View style={[styles.row, containerStyle]}>
      {Array.from({ length: count }).map((_, index) => (
        <View
          key={index}
          style={[style.dot, index === currentIndex ? style.activeDot : null]}
        />
      ))}
    </View>
  );
};

const style = StyleSheet.create({
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: COLORS.listtxt,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: COLORS.primary,
    width: 11,
    height: 11,
    borderRadius: 8,
  },
});
