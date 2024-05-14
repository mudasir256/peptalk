import React from "react";
import { Text, TextStyle } from "react-native";

interface TypographyProps {
  variant: "heading" | "body" | "caption";
  children: React.ReactNode;
}

const Typography: React.FC<TypographyProps> = ({ variant, children }) => {
  let textStyle: TextStyle = {};

  switch (variant) {
    case "heading":
      textStyle = {
        fontSize: 24,
        fontWeight: "700",
      };
      break;
    case "body":
      textStyle = {
        fontSize: 16,
        lineHeight: 24,
      };
      break;
    case "caption":
      textStyle = {
        fontSize: 12,
        color: "gray",
      };
      break;
    default:
      break;
  }

  return <Text style={[textStyle]}>{children}</Text>;
};

export default Typography;
