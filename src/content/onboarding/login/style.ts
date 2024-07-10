import { COLORS } from "../../../common/theme/colors";
import { StyleSheet } from 'react-native'
import { styles } from "../../../common/theme/styles";
import { SPACINGS } from "../../../common/theme/spacing";
import { Label, Radius, SecondaryWeight, rare } from "../../../common/theme/typography";

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
    borderRadius: SPACINGS.tiny,
    borderColor: COLORS.text,
    borderWidth: SPACINGS.s,
  },

  labelContainer: {
    ...styles.start
  },
  label: {
   ...rare,
  },
  labellink: {
    ...rare,
    color: COLORS.link,
  },
  buttonContainer: {
    backgroundColor: COLORS.secondary,
    borderRadius: SPACINGS.Radius,
    marginBottom: SPACINGS.xl,
    ...styles.center,
    borderWidth: 0,
  },
  buttonText: {
    color: COLORS.white,
    ...SecondaryWeight,
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: SPACINGS.sm,
  },
  border: {
    ...Radius,
    borderColor: COLORS.primary,
    padding: SPACINGS.sm,
    backgroundColor: COLORS.white,
    borderRadius: SPACINGS.sm,
  },
  forgotlabel: {
    ...Label,
    color: COLORS.link,
    alignSelf: "flex-end",
  },

});
