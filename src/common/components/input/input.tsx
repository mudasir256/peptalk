import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInputProps,
} from "react-native";
import { COLORS } from "../../theme/colors";
import { SPACINGS } from "../../theme/spacing";
import { SearchIcon } from "../../../assets/svgs/svgIcons";
import { styles } from "../../theme/styles";
import { Radius } from "../../theme/typography";

export type TextInputFieldProps = TextInputProps & {
  containerStyle?: any;
  inputStyle?: any;
  placeholder: string;
  validationError?: string;
  rightIcon?: React.ReactNode;
  iconSize?: number;
  onChangeText?: (text: string) => void;
  onRightIconPress?: () => void;
  onPress?: () => void;
  searchIcon?: boolean;
  focusBorderColor?: string;
  FocusBorderWidth?: number;
  secureTextEntry?: boolean;
  value?: string;
};

export const TextInputField = ({
  containerStyle,
  inputStyle,
  placeholder,
  searchIcon,
  onChangeText,
  validationError,
  rightIcon,
  iconSize = 20,
  onRightIconPress,
  onPress,
  focusBorderColor = COLORS.primary,
  FocusBorderWidth = 2,
  ...rest
}: TextInputFieldProps) => {
  const [focus, setFocus] = useState(false);

  return (
    <>
      <View
        style={[
          style.searchContainer,
          focus && {
            borderColor: focusBorderColor,
            borderWidth: FocusBorderWidth,
          },
          containerStyle,
        ]}
      >
        {searchIcon && <SearchIcon style={style.iconStyle} />}
        <TextInput
          style={[style.input, inputStyle]}
          placeholder={placeholder}
          onChangeText={onChangeText}
          onFocus={() => {
            onPress ? onPress() : setFocus(true);
          }}
          onBlur={() => setFocus(false)}
          {...rest}
        />

        {rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            style={[
              style.iconButton,
              { transform: [{ translateY: -iconSize / 20 }] },
            ]}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
      <View style={style.errorContainer}>
        {validationError && !focus && (
          <Text style={style.errorText}>{validationError}</Text>
        )}
      </View>
    </>
  );
};

const style = StyleSheet.create({
  input: {
    ...styles.flex,
    height: 50,
    paddingHorizontal: 10,
  },
  iconButton: {
    ...styles.center,
    position: "absolute",
    height: "100%",
    right: SPACINGS.sm,
  },
  iconStyle: {
    marginLeft: SPACINGS.sm,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: SPACINGS.tiny,
  },
  searchContainer: {
    backgroundColor: COLORS.white,
    borderRadius: SPACINGS.sm,
    ...styles.rowCenter,
    borderColor: "transparent",
    height: 50,
  },
  errorContainer: {
    minHeight: 20,
  },
});
