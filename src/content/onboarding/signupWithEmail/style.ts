import { COLORS } from "../../../common/theme/colors";
import {StyleSheet} from 'react-native'
import { styles } from "../../../common/theme/styles";
import { SPACING } from "../../../common/theme/spacing";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dcf6f4",
  },
  innerContainer: {
    padding: SPACING.md,
  },
  checkboxContainer: {
    marginTop: 30,
    ...styles.rowCenter,
  },
  checkbox: {
    borderRadius: 8,
    borderColor:COLORS.text,
    borderWidth:2
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
    marginTop: "60%",
    borderWidth:0,
  },
  buttonText: {
    color: "white",
    fontWeight: "700"
  },

});
