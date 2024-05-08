import { StyleSheet } from 'react-native'
import { COLORS } from '../../../common/theme/colors';
import { styles } from '../../../common/theme/styles';
import { SPACINGS } from '../../../common/theme/spacing';

export const style = StyleSheet.create({
  modalContainer: {
    paddingHorizontal: SPACINGS.md,
  },
  head: {
    ...styles.flexRow,
    marginBottom: SPACINGS.md
  },
  move: {
    fontSize: 25,
    fontWeight: "500",
    lineHeight: 38,
    color: COLORS.text
  },
  folder: {
    marginBottom: SPACINGS.md
  },
  button: {
    backgroundColor: COLORS.secondary,
    borderRadius: 25,
    borderWidth: 0,
    marginTop: 1,
  },
  buttonContainer: {
    ...styles.flex,
    ...styles.rowCenter,
    borderTopWidth: 1,
    borderTopColor: "white",
  }
});
