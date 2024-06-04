import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "./src/common/store";
import { StyleSheet, View } from "react-native";
import { COLORS } from "./src/common/theme/colors";
import FontProvider from "./src/common/components/fontProvider/fontProvider";
import { RootNavigator } from "./src/common/navigation/RootNavigator";
import i18n from "./src/common/components/utils/i18n";
import { useEffect } from "react";
import Toast from "react-native-toast-message";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./src/common/store/store";

export default function App() {
  useEffect(() => {
    i18n.changeLanguage("en");
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <FontProvider>
          <View style={styles.header}>
            <StatusBar style="dark" />
          </View>
          <RootNavigator />
          <Toast topOffset={60} position="bottom" />
        </FontProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.primary,
    height: 60,
  },
});
