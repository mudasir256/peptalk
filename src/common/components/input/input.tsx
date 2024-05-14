import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import { COLORS } from "../../theme/colors";
import { SPACINGS } from "../../theme/spacing";
import { SearchIcon } from "../../../assets/svgs/svgIcons";

export type TextInputFieldProps = {
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
      <Text style={style.errorText}>{validationError}</Text>
    </>
  );
};

const style = StyleSheet.create({
  input: {
    flex: 1,
    paddingHorizontal: 10,
  },
  iconButton: {
    position: "absolute",
    right: 10,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  iconStyle: {
    marginLeft: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: SPACINGS.tiny,
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "transparent",
    height: 50,
    alignItems: "center",
  },
});
