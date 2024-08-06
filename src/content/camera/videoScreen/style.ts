import { StyleSheet } from "react-native";
import { COLORS } from "../../../common/theme/colors";
import { SPACINGS } from "../../../common/theme/spacing";
import { styles } from "../../../common/theme/styles";
import { ButtonTextPrimary } from "../../../common/theme/typography";


export const style = StyleSheet.create({

  container: {
    ...styles.justifyCenter,
  },
  video: {
    width: "100%",
    height: "63.5%",
  },
  videoContainer: {},
  back: {
    ...styles.alignCenter,
    ...styles.row,
    marginTop: SPACINGS.sm,
  },
  backbtn: {
    ...ButtonTextPrimary,
  },
  iconContainer: {
    borderWidth: 2,
    borderColor: COLORS.secondary,
    borderRadius: 25,
    backgroundColor: COLORS.dropdownbg,
    width: 50,
    height: 50,
    marginLeft: SPACINGS.xs,
    ...styles.center,
  },
  btnContainer: {
    padding: SPACINGS.sm,
    ...styles.row,
    ...styles.end,
  },
  bottombtn: {
    padding: SPACINGS.sm,
    ...styles.row,
    ...styles.between,
  },
  discard: {
    borderColor: COLORS.secondary,
    width: 120,
  },
  save: {
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.secondary,
    marginLeft: SPACINGS.sm,
    width: 100,
  },
  buttonContainer: {
    ...styles.row,
    ...styles.between,
    padding: SPACINGS.sm,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  trim:{
    borderColor: COLORS.secondary,
    width: 120,
    marginLeft:10
  }
})