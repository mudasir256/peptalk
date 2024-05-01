
import { COLORS } from "../../theme/colors";
import {StyleSheet} from 'react-native'
import { styles } from "../../theme/styles";

export const style = StyleSheet.create({
buttonContainer: { 
  backgroundColor: COLORS.button,
  borderWidth: 2,
  borderColor: COLORS.border,
  borderRadius: 25,
  paddingHorizontal: 22,
  ...styles.buttonSize,
  ...styles.start
},
buttonText:{
  fontSize: 17,
  fontStyle: "normal",
  fontWeight: "500",
  lineHeight: 24,
},
textContainer: {
  ...styles.flex,
  alignItems: 'center',
},
});
