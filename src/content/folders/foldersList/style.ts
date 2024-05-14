import { StyleSheet } from 'react-native';
import { styles } from '../../../common/theme/styles';
import { COLORS } from '../../../common/theme/colors';
import { SPACINGS } from '../../../common/theme/spacing';

export const style = StyleSheet.create({
  container: {
    padding: SPACINGS.md,
    width: 165,
  },
  imageContainer: {
    borderColor: COLORS.folderBorder,
    position: 'relative',
    borderWidth: 2,
    borderRadius: 10,
    width: 165,
    height: 162,
  },
  dentist: {
    ...styles.rowCenter
  },
  image: {
    resizeMode: 'stretch',
    position: 'absolute',
    height: "100%",
  },
  folderBottom: {
    ...styles.flexRow,
    ...styles.alignCenter,
    marginTop: 10,
    width: 165,
  },
  folderIcon: {
    fontSize: 20,
    marginRight: 5,
  },
  folderText: {
    fontSize: 16,
    marginRight: 5,
  },
  ellipseContainer: {
    ...styles.row,
  },
  ellipseIcon: {
    color: COLORS.text
  },
})