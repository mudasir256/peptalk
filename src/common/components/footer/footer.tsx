import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';

const Footer = ({ children }) => {
  return (
    <View style={styles.container}>
      {children}
      <View style={styles.footer}>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    height:30,
    backgroundColor:COLORS.primary
  },
});

export default Footer;
