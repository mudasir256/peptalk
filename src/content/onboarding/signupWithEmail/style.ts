import { COLORS } from "../../../common/theme/colors";
import { StyleSheet } from 'react-native'
import { styles } from "../../../common/theme/styles";
import { SPACINGS } from "../../../common/theme/spacing";

export const style = StyleSheet.create({
  innerContainer: {
    padding: SPACINGS.md,
    ...styles.flex,
  },
  spacer: {
    ...styles.flex,
  },
  checkboxContainer: {
    marginTop: 30,
    ...styles.rowCenter,
  },
  checkbox: {
    borderRadius: 4,
    borderColor: COLORS.text,
    borderWidth: 2
  },

  labelContainer: {
    ...styles.start
  },
  label: {
    fontSize: 12,
  },
  labellink: {
    fontSize: 12,
    color: COLORS.link,
  },
  buttonContainer: {
    backgroundColor: COLORS.secondary,
    ...styles.center,
    borderRadius: 25,
    borderWidth: 0,
    marginBottom: SPACINGS.xl
  },
  buttonText: {
    color: "white",
    fontWeight: "700"
  },
});
