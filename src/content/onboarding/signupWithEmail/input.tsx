import React, { useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Text, TextInputProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../common/theme/colors";

type Props = TextInputProps & {
  placeholder: string
  onChangeText?: (text: string) => void
  isPasswordVisible?: boolean; 
  validationError?: string
}

export const InputField = ({
  placeholder,
  onChangeText,
  isPasswordVisible = false,
  validationError,
  ...rest
}: Props) => {
  const [focus, setFocus] = useState(false);
  const customStyle = focus ? styles.border : styles.input;
  const [hidePassword, setHidePassword] = useState(true);

  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={customStyle}
          placeholder={placeholder}
          onChangeText={onChangeText}
          secureTextEntry={isPasswordVisible && hidePassword}
          {...rest}
        />
        {isPasswordVisible && (
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.icon}>
            <Ionicons name={hidePassword ? 'eye' : 'eye-off'} size={20} color={'gray'} />
          </TouchableOpacity>
        )}
      </View>
      <View style={[styles.errorContainer, { opacity: validationError ? 1 : 0 }]}>
        <Text style={styles.errorText}>{validationError}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5, 
},
  inputContainer:{
    marginVertical:5,
  },
  input:{
    height:50,
    padding:11,
    backgroundColor:"white",
    borderRadius:10,
  },
  border:{
    borderWidth:2,
    borderColor:COLORS.primary,
    height:50,
    padding:11,
    backgroundColor:"white",
    borderRadius:10,
  },
icon: {
    position: "absolute",
    right: 10,
    top: 15,
},
errorContainer: {
    minHeight: 0, 
},
errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
},
});
