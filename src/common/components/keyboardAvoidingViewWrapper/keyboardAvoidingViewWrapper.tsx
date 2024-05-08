import React, { ReactNode } from "react";
import { KeyboardAvoidingView, TouchableWithoutFeedback, StyleSheet, ViewStyle, Keyboard } from "react-native";
import { styles } from "../../theme/styles";
import { COLORS } from "../../theme/colors";

type Props = {
  containerStyle?: ViewStyle
  children: ReactNode
}

export const KeyboardAvoidingViewWrapper = ({ containerStyle = undefined, children = undefined }: Props) => (
  <KeyboardAvoidingView style={[style.container, containerStyle]} behavior="padding">
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      {children}
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
)

const style = StyleSheet.create({
  container: {
    ...styles.flex,
    backgroundColor: COLORS.contrast
  }
})