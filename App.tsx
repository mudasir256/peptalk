import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "./src/common/store";
import { StyleSheet, View } from "react-native";
import { COLORS } from "./src/common/theme/colors";
import FontProvider from "./src/common/components/fontProvider/fontProvider";
import { RootNavigator } from "./src/common/navigation/RootNavigator";

export default function App() {
  return (
    <Provider store={store}>
      <FontProvider>
        <View style={styles.header}>
          <StatusBar style="dark" />
        </View>
        <RootNavigator />
      </FontProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.primary,
    height: 60,
  },
});
