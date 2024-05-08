import { StyleSheet } from 'react-native'
import { COLORS } from '../../common/theme/colors';
import { styles } from '../../common/theme/styles';
import { SPACINGS } from '../../common/theme/spacing';

export const style = StyleSheet.create({
  container: {
  },
  head: {
    padding: SPACINGS.md,
    backgroundColor: COLORS.header,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    ...styles.row,
  },
  title: {
    fontSize: 34,
    fontWeight: '500',
    lineHeight: 38,
    color: COLORS.text,
    flex: 1
  },
  back: {
    ...styles.row,
    ...styles.alignCenter,
  },
  headerContainer: {
    ...styles.row,
    ...styles.alignCenter,
    paddingVertical: SPACINGS.lg
  },
  search: {
    width: "76%",
    height: 50,
    marginLeft: 10,
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
    backgroundColor: COLORS.header,
  },
  itemContainer: {
    ...styles.row,
    paddingVertical: SPACINGS.sm,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.searchBorder,
    padding: SPACINGS.md,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  titleData: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 20,
    flex: 1
  },
  list: {
    marginVertical: SPACINGS.md,
    marginBottom: 80
  }

});
