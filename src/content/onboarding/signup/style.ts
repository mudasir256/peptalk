import { COLORS } from "../../../common/theme/colors";
import { StyleSheet } from 'react-native'
import { styles } from "../../../common/theme/styles";
import { SPACINGS } from "../../../common/theme/spacing";
import { ButtonTextPrimary, PrimaryTitle } from "../../../common/theme/typography";

export const style = StyleSheet.create({
  container: {
    backgroundColor: COLORS.contrast,
  },
  imageBg: {
    width: '100%',
    ...styles.aspectRatio,
  },
  getStartedText: {
    ...PrimaryTitle,
  },
  buttonsContainer: {
    ...styles.alignCenter,
  },
  alreadyAccount: {
    ...ButtonTextPrimary,
  },
  loginButton: {
    ...ButtonTextPrimary,
    color: COLORS.link,
    marginLeft: SPACINGS.xs,
  },
  loginContainer: {
    ...styles.rowCenter,
    marginBottom: SPACINGS.md,
    marginTop: 20
  }
});
