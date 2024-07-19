import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  progressContainer: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    alignItems: "center",
  },
  progressText: {
    fontSize: 18,
    marginBottom: 10,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
