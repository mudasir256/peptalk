import { StyleSheet } from "react-native";
import { COLORS } from "../../../theme/colors";
import { SPACINGS } from "../../../theme/spacing";
import { styles } from "../../../theme/styles";
import {
  SecondaryText,
  SecondaryWeight,
  SecondryFont,
} from "../../../theme/typography";

export const style = StyleSheet.create({
  centeredView: {
    padding: SPACINGS.md,
    ...styles.flexCenter,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: COLORS.white,
    borderRadius: SPACINGS.sm,
    padding: 20,
  },
  addNew: {
    color: COLORS.text,
    ...SecondaryWeight,
    ...SecondryFont,
    marginBottom: 33,
  },
  modalTitle: {
    marginBottom: SPACINGS.sm,
    ...SecondaryWeight,
    color: COLORS.text,
    ...SecondryFont,
  },
  cancel: {
    width: 110,
    height:50,
    borderColor: COLORS.secondary,
  },
  ok: {
    width: 75,
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.secondary,
    marginLeft: SPACINGS.sm,
  },
  buttonContainer: {
    ...styles.row,
    ...styles.end,
    width: "100%",
    paddingTop: SPACINGS.md,
  },
  description: {
    ...SecondaryText,
    paddingVertical: SPACINGS.md,
  },
  error: {
    color: COLORS.error,
  },
});
