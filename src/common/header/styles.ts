import { StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import { styles } from '../theme/styles';
import { ButtonTextPrimary, CommonFont, NormalFont, TextAlign, mainTitle } from '../theme/typography';
import { SPACINGS } from '../theme/spacing';

export const style = StyleSheet.create({
  container: {
    borderBottomRightRadius: SPACINGS.Radius,
    borderBottomLeftRadius: SPACINGS.Radius,
    backgroundColor: COLORS.header,
    paddingHorizontal: SPACINGS.md,
    paddingTop: SPACINGS.md,
  },
  head: {
    ...styles.row,
    ...TextAlign,
    ...styles.rowBetween
  },
  title: {
    ...mainTitle,
    height: 40,
    width:190
  },
  btn:{
...styles.row,
...styles.alignCenter
  },
  dropdown: {
    backgroundColor: COLORS.dropdownbg,
    borderColor: COLORS.secondary,
    borderRadius: SPACINGS.Radius,
    paddingVertical: SPACINGS.xxs,
    paddingRight: SPACINGS.rg,
    paddingLeft: SPACINGS.md,
    borderWidth: SPACINGS.s,
    ...styles.center,
    ...styles.row,
  },
  addFolder: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
    marginLeft: SPACINGS.rg,
    ...styles.center,
    height: 35,
    width: 35,
    borderRadius: 20,
  },
  selectedValue: {
    marginRight: SPACINGS.s,
    color: COLORS.text,
    ...NormalFont,
  },
  dropdownContent: {
    backgroundColor: COLORS.white,
    ...styles.absolute,
    borderColor: '#ccc',
    borderRadius: 10,
    borderWidth: 1,
    zIndex: 1000,
    width: 150,
    right: 0,
    top: 0,
  },
  item: {
    padding: SPACINGS.sm,
  },
  input: {
    backgroundColor: COLORS.inputbg,
    marginVertical: 15,
    zIndex: -1,
  },
  headerButton: {
    ...styles.row,
  },
  dropdownLabel: {
    ...CommonFont
  },
});
