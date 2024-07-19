import { COLORS } from "../../theme/colors";
import { StyleSheet } from "react-native";
import { styles } from "../../theme/styles";
import { ButtonTextPrimary } from "../../theme/typography";

export const style = StyleSheet.create({
  buttonContainer: {
    backgroundColor: COLORS.buttonbg,
    borderColor: COLORS.border,
    maxWidth: 343,
    //flex: 1,
    height: 55,
    ...styles.start,
    paddingHorizontal: 22,
    borderRadius: 25,
    borderWidth: 2,
  },
  buttonText: {
    ...ButtonTextPrimary,
  },
  textContainer: {
    ...styles.flex,
    ...styles.alignCenter,
  },
  disabled: {
    opacity: 0.9,
  },
});
