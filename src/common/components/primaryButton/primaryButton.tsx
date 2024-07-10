import React from "react";
import {
  TouchableOpacity,
  Text,
  Image,
  View,
  ImageRequireSource,
  ViewStyle,
  TouchableOpacityProps,
  ActivityIndicator,
} from "react-native";
import { style } from "./style";

type Props = TouchableOpacityProps & {
  title: string;
  icon?: ImageRequireSource;
  onPress?: VoidFunction;
  containerStyle?: ViewStyle;
  loading?: boolean;
  disabled?: boolean;
};

export const PrimaryButton = ({
  title,
  icon = undefined,
  onPress = undefined,
  containerStyle = undefined,
  loading = false,
  disabled,
  ...rest
}: Props) => (
  <TouchableOpacity
    style={[style.buttonContainer, containerStyle, loading && style.disabled]}
    {...rest}
    onPress={loading ? undefined : onPress}
    disabled={loading || disabled}
  >
    {icon && <Image source={icon} />}
    <View style={[style.textContainer, { marginEnd: icon ? 24 : 0 }]}>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={style.buttonText}>{title}</Text>
      )}
    </View>
  </TouchableOpacity>
);
