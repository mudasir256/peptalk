import React from 'react';
import { TouchableOpacity, Text, Image, View, ImageRequireSource, ViewStyle, ViewProps, TouchableOpacityProps } from 'react-native';
import { style } from './style';

type Props = TouchableOpacityProps & {
  title: string
  icon?: ImageRequireSource
  onPress?: VoidFunction
  containerStyle?: ViewStyle
}

export const PrimaryButton = ({ 
  title, 
  icon = undefined, 
  onPress = undefined, 
  containerStyle = undefined, 
  ...rest
}: Props) => {
  console.log("CONTAINER STYLE:: ", containerStyle)
  return (
    <TouchableOpacity style={[style.buttonContainer, containerStyle]} {...rest} onPress={onPress}>
      {icon && <Image source={icon} />}
      <View style={[style.textContainer, {marginEnd: icon ? 24 : 0}]}>
        <Text style={style.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};


