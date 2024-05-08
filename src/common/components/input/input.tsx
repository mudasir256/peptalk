import React, { ReactNode, useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Text, TextInputProps, ImageRequireSource, ViewStyle, TextStyle } from "react-native";
import { COLORS } from "../../theme/colors";
import { SPACINGS } from "../../theme/spacing";

export type TextInputFieldProps = TextInputProps & {
  containerStyle?: ViewStyle
  inputStyle?: TextStyle
  placeholder: string
  validationError?: string
  rightIcon?: ReactNode
  iconSize?: number
  onChangeText?: (text: string) => void
  onRightIconPress?: VoidFunction
  onPress?: () => void
}

export const TextInputField = ({
  containerStyle = undefined,
  inputStyle = undefined,
  placeholder,
  onChangeText,
  validationError,
  rightIcon = undefined,
  iconSize = 20,
  onPress,
  onRightIconPress = undefined,
  ...rest
}: TextInputFieldProps) => {
  const [focus, setFocus] = useState(false);

  return (
    <View style={containerStyle}>
      <TouchableOpacity>
        <TextInput
          style={[style.input, focus && style.border, inputStyle,]}
          placeholder={placeholder}
          onChangeText={onChangeText}
          onFocus={() => { setFocus(true,), onPress() }}
          onBlur={() => setFocus(false)}
          {...rest}
        />
        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress} style={[style.icon, { transform: [{ translateY: -iconSize / 2 }] }]}>
            {rightIcon}
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      <Text style={style.errorText}>{validationError}</Text>
    </View >
  );
};

const style = StyleSheet.create({
  input: {
    height: 50,
    padding: SPACINGS.rg,
    backgroundColor: COLORS.white,
    borderRadius: SPACINGS.sm,
    borderColor: COLORS.primary,
    borderWidth: 0,
    fontSize: 17
  },
  border: {
    borderWidth: 2,
  },
  icon: {
    position: "absolute",
    right: 8,
    top: '50%',
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: SPACINGS.tiny,
  },
});
