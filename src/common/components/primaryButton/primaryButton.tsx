import React, { memo } from "react";
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
import { COLORS } from "../../theme/colors";

type Props = TouchableOpacityProps & {
  title: string;
  icon?: ImageRequireSource;
  onPress?: VoidFunction;
  containerStyle?: ViewStyle;
  loading?: boolean;
  disabled?: boolean;
  loadingColor?: string;
};

export const PrimaryButton = memo(
  ({
    title,
    icon = undefined,
    onPress = undefined,
    containerStyle = undefined,
    loading = false,
    disabled,
    loadingColor = COLORS.white,
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
          <ActivityIndicator color={loadingColor} />
        ) : (
          <Text style={style.buttonText}>{title}</Text>
        )}
      </View>
    </TouchableOpacity>
  )
);
