import { StyleSheet } from 'react-native'
import { COLORS } from '../../common/theme/colors';
import { styles } from '../../common/theme/styles';
import { SPACINGS } from '../../common/theme/spacing';
import { SecondaryText, mainTitle } from '../../common/theme/typography';

export const style = StyleSheet.create({
  container: {
  },
  head: {
    borderBottomRightRadius: SPACINGS.Radius,
    borderBottomLeftRadius: SPACINGS.Radius,
    backgroundColor: COLORS.header,
    padding: SPACINGS.md,
    ...styles.row,
  },
  title: {
    ...styles.flex,
    ...mainTitle,
  },
  back: {
    ...styles.alignCenter,
    ...styles.row,
  },
  headerContainer: {
    ...styles.row,
    ...styles.alignCenter,
    paddingVertical: SPACINGS.lg
  },
  search: {
    width: "76%",
    height: 50,
    marginLeft: SPACINGS.sm,
  },
  heading: {
    backgroundColor: COLORS.header,
    padding: SPACINGS.md,
   ...SecondaryText,
  },
  itemContainer: {
    borderBottomColor: COLORS.searchBorder,
    paddingVertical: SPACINGS.sm,
    padding: SPACINGS.md,
    ...styles.row,
    borderBottomWidth: 0.3,
  },
  icon: {
    ...styles.iconSize,
    marginRight: SPACINGS.sm,
  },
  titleData: {
    ...SecondaryText,
    ...styles.flex,
  },
  list: {
    marginVertical: SPACINGS.md,
    marginBottom: 80
  },
  version: {
    marginRight: SPACINGS.md
  }

});
