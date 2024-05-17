import { StyleSheet } from 'react-native'
import { SPACINGS } from '../../common/theme/spacing'
import { COLORS } from '../../common/theme/colors';
import { styles } from "../../common/theme/styles"
import { ButtonTextPrimary, SecondaryText } from '../../common/theme/typography';

export const style = StyleSheet.create({

  container: {
    backgroundColor: COLORS.white,
  },
  back: {
    ...styles.alignCenter,
    ...styles.row,
  },
  backbtn: {
    ...ButtonTextPrimary,
  },
  headerContainer: {
    paddingVertical: SPACINGS.lg,
    ...styles.alignCenter,
    ...styles.row,
  },
  search: {
    backgroundColor: COLORS.inputbg,
    marginLeft: SPACINGS.sm,
    width: "76%",
    height: 50,
  },
  heading: {
    backgroundColor: COLORS.listbg,
    padding: SPACINGS.md,
    ...SecondaryText,
  },
  itemContainer: {
    borderBottomColor: COLORS.searchBorder,
    backgroundColor: COLORS.white,
    borderBottomWidth: SPACINGS.s,
    paddingVertical: SPACINGS.sm,
    padding: SPACINGS.md,
    ...styles.row,
  },
  icon: {
    marginRight: SPACINGS.sm,
    ...styles.iconSize,
  },
  title: {
    ...SecondaryText,
  },

})