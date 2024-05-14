import { StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import { styles } from '../theme/styles';

export const style = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: COLORS.header,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  head: {
    ...styles.row,
    alignItems: 'center',
  },
  title: {
    fontSize: 34,
    fontWeight: '500',
    lineHeight: 38,
    color: COLORS.text,
    flex: 1
  },
  dropdown: {
    backgroundColor: COLORS.dropdownbg,
    borderColor: COLORS.secondary,
    ...styles.center,
    ...styles.row,
    borderWidth: 2,
    borderRadius: 20,
    paddingLeft: 16,
    paddingRight: 12,
    paddingVertical: 7
  },
  addFolder: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
    ...styles.center,
    height: 30,
    width: 30,
    borderRadius: 15,
    marginLeft: 12,
  },
  selectedValue: {
    color: COLORS.text,
    fontSize: 15,
    marginRight: 2
  },
  dropdownContent: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    position: 'absolute',
    right: 0,
    top: 0,
    width: 150,
    zIndex: 1000
  },
  item: {
    padding: 10,
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
    fontSize: 17
  }
});
