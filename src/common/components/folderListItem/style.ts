import { StyleSheet } from 'react-native'
import { COLORS } from '../../theme/colors';
import { SPACINGS } from '../../theme/spacing';
import { styles } from '../../theme/styles';



export const style = StyleSheet.create({
  container: {
    backgroundColor: COLORS.listbg,
    padding: SPACINGS.sm,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.header,
    borderRadius: 5,
    ...styles.row,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: 127,
    height: 147,
    borderRadius: 5,
    marginRight: 10,
  },
  imageIconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  details: {
    ...styles.rowBetween,
    flex: 1
  },
  title: {
    fontSize: 17,
    fontWeight: "500",
    lineHeight: 22,
    color: COLORS.text
  },
  date: {
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 20,
    color: COLORS.listtxt
  },
  iconsContainer: {
    ...styles.row,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  iconContainer: {
    borderWidth: 2,
    borderColor: COLORS.secondary,
    borderRadius: 25,
    backgroundColor: COLORS.dropdownbg,
    padding: 6,
    marginLeft: SPACINGS.xs,
    height: 32
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 5,
  },
});
