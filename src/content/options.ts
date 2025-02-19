import { COLORS } from "../common/theme/colors"

export const noHeader = {
  headerShown: false
}

export const header = {
  headerShown: true
}

export const headerOptions = {
  headerBackTitle: 'Back',
  headerStyle: {
    backgroundColor: COLORS.contrast,
    borderBottomWidth: 0,
    shadowColor: "transparent",
  },
  headerTintColor: COLORS.text,
  headerShadowVisible: false,
}
