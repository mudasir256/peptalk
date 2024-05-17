import { TextStyle } from "react-native";
import { COLORS } from "./colors";

export const mainTitle: TextStyle = {
  fontSize: 34,
  fontFamily:"SF-Pro-Text-Bold",
  lineHeight: 38,
  color: COLORS.text,
}
export const  PrimaryTitle: TextStyle = {
  fontSize: 34,
  fontFamily:"SF-Pro-Text-Semibold",
  lineHeight: 38,
  color: COLORS.text,
}
export const ButtonTextPrimary: TextStyle = {
  fontSize: 17,
  color: COLORS.text,
  textAlign:"center",
  fontFamily:"SF-Pro-Text-Semibold",
}
export const SecondaryText: TextStyle = {
  fontSize: 15,
  fontFamily: "SF-Pro-Text-Medium",
  lineHeight: 20,
  color: COLORS.text,
}
export const TextWeight: TextStyle = {
  fontWeight: "500",
}

export const SecondaryWeight: TextStyle = {
  fontWeight: "700",
}

export const TextAlign: TextStyle = {
   textAlign:"center"
}

export const PrimaryFont: TextStyle = {
  fontSize: 34,
}

export const SecondryFont: TextStyle = {
  fontSize: 20,
}

export const NormalFont: TextStyle = {
  fontSize: 15,
}

export const CommonFont: TextStyle = {
  fontSize: 17,
}

export const rare: TextStyle = {
  fontSize: 12,
}

export const PrimaryText: TextStyle = {
  ...SecondryFont,
  fontWeight:"600"
}

export const Radius: TextStyle = {
   borderRadius:2
}