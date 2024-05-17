import React from "react";
import { View } from "react-native";
import Header from "../../common/header/header";
import { styles } from "../../common/theme/styles";
import FolderItemsList from "./folderItemsList/folderItemsList";
import { useTranslation } from "react-i18next";

const HomeScreen = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.flex}>
      <Header title={t("header.recent")} />
      <FolderItemsList />
    </View>
  );
};

export default HomeScreen;
