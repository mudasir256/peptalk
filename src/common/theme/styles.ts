import { ViewStyle } from "react-native"

const flex: Partial<ViewStyle> = {
  flex: 1
}

const center: Partial<ViewStyle> = {
  alignItems: 'center',
  justifyContent: 'center',
}
const start: Partial<ViewStyle> = {
  flexDirection:"row",
  alignItems: 'center',
  justifyContent: "flex-start",
}

const flexCenter: Partial<ViewStyle> = {
  ...flex,
  ...center
}

const absolute: Partial<ViewStyle> = {
  position: 'absolute'
}

const absoluteFill: Partial<ViewStyle> = {
  ...absolute,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0
}

const absoluteCenter: Partial<ViewStyle> = {
  ...absoluteFill, 
  ...center
}

const row: Partial<ViewStyle> = {
  flexDirection: 'row'
}

const rowCenter: Partial<ViewStyle> = {
  ...row,
  ...center
}

const aspectRatio: Partial<ViewStyle> = {
  aspectRatio: 1
}

const buttonSize: Partial<ViewStyle> = {
  width: 343,
  height: 55,
}

const iconSize: Partial<ViewStyle> = {
  width: 24,
  height: 24,
}

export const styles = {
  flex,
  center,
  flexCenter,
  absoluteCenter,
  aspectRatio,
  row,
  start,
  rowCenter,
  buttonSize,
  iconSize
}