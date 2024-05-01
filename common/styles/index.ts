import { ViewStyle } from "react-native"

const flex: Partial<ViewStyle> = {
  flex: 1
}

const center: Partial<ViewStyle> = {
  alignItems: 'center',
  justifyContent: 'center',
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

export const styles = {
  flex,
  center,
  flexCenter,
  absoluteCenter,
  rowCenter
}