import React, { useState } from "react";
import { TextInputField, TextInputFieldProps } from "../input/input";
import { Ionicons } from "@expo/vector-icons";

export const PasswordInput = (props: TextInputFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  console.log(showPassword);

  return (
    <TextInputField
      {...props}
      secureTextEntry={!showPassword}
      rightIcon={
        <Ionicons
          name={!showPassword ? "eye" : "eye-off"}
          size={20}
          color={"gray"}
        />
      }
      onRightIconPress={() => setShowPassword((prev) => !prev)}
    />
  );
};
