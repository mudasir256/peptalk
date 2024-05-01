import { COLORS } from "../../../common/theme/colors";
import {StyleSheet} from 'react-native'
import { styles } from "../../../common/theme/styles";
import { SPACING } from "../../../common/theme/spacing";

export const style = StyleSheet.create({
  container: {
    backgroundColor: COLORS.contrast,
  },
  imageBg: {
    width: '100%',
    aspectRatio: 1,
  },
  getStartedText: {
    fontSize: 34,
    fontWeight: "700",
    color: COLORS.text,
    textShadowColor: COLORS.shadow,
    textShadowOffset: { 
      width: 2, 
      height: 6
    },
    textShadowRadius: 5,
    lineHeight: 38
  },
  buttonsContainer:{
    alignItems: 'center'
  },
  alreadyAccount:{
    fontSize:17,
    fontWeight:"500",
    color:COLORS.text,
    lineHeight:22
  },
  loginButton:{
    fontSize:17,
    fontWeight:"500",
    color:COLORS.link,
    marginLeft: SPACING.sm,
    lineHeight:22
  },
  loginContainer:{
    ...styles.rowCenter,
    marginBottom: 18,
    marginTop: 40
  }
});
