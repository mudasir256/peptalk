import {
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageRequireSource,
} from "react-native";
import React from "react";
import { COLORS } from "../../../common/theme/colors";
import { SPACINGS } from "../../../common/theme/spacing";

type Props = {
  icon: ImageRequireSource;
  onPress?: VoidFunction;
};

const IconButton = ({ icon, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={style.container}>
      <Image style={style.icon} source={icon} />
    </TouchableOpacity>
  );
};

export default IconButton;

const style = StyleSheet.create({
  container: {
    backgroundColor: COLORS.dropdownbg,
    borderRadius: SPACINGS.Radius,
    borderColor: COLORS.secondary,
    marginLeft: SPACINGS.xs,
    borderWidth: SPACINGS.s,
    padding: 6,
    height: 32,
  },
  icon: {
    height: 16,
    width: 16,
  },
});
