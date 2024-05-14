import { StyleSheet } from 'react-native'
import { SPACINGS } from '../../common/theme/spacing'
import { COLORS } from '../../common/theme/colors';
import { styles } from "../../common/theme/styles"

export const style = StyleSheet.create({

  container: {
    backgroundColor: "white",
  },
  back: {
    ...styles.row,
    ...styles.alignCenter,
  },
  headerContainer: {
    ...styles.row,
    ...styles.alignCenter,
    paddingVertical: SPACINGS.lg,
  },
  search: {
    width: "76%",
    height: 50,
    marginLeft: 10,
    backgroundColor: COLORS.inputbg
  },
  backbtn: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: "500",
    lineHeight: 22,
  },
  heading: {
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 20,
    padding: SPACINGS.md,
    color: COLORS.text,
    backgroundColor: COLORS.listbg,
  },
  itemContainer: {
    ...styles.row,
    paddingVertical: SPACINGS.sm,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.searchBorder,
    padding: SPACINGS.md,
    backgroundColor: "white",
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  title: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 20,
  },

})