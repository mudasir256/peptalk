import { StyleSheet } from "react-native";
import { COLORS } from "../../common/theme/colors";
import { styles } from "../../common/theme/styles";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  buttonText: {
    backgroundColor:COLORS.white,
    paddingHorizontal:12,
    paddingVertical:12,
    borderRadius: 20,

  },
  button: {
    position: "absolute",
    bottom: 60,
    height: 80,
    width: 80,
    borderColor:COLORS.white,
    borderWidth:2,
    borderRadius: 40, 
   ...styles.center,
  },
  reverseCam:{
    position: "absolute",
    bottom: 72,
    left:10,
    height: 54,
    width: 54,
    borderColor:COLORS.white,
    borderWidth:2,
    borderRadius: 40, 
    backgroundColor: COLORS.shadow,
    ...styles.center
  },
  recording:{
    position: "absolute",
    bottom:8,
    height: 30,
    width: 56,
    opacity:.5,
    borderColor:COLORS.error,
    backgroundColor: COLORS.error,
    borderWidth:2,
    borderRadius: 40, 
    ...styles.center
  },
  txt:{
    color:COLORS.white
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  noDevice:{
    
  }
});
