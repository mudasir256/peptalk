import React from "react";
import { View } from "react-native";
import Header from "../../common/header/header";
import { styles } from "../../common/theme/styles";
import FolderItemsListView from "./folderItemsList/FolderItemsListView";
import { useTranslation } from "react-i18next";
import { useGetMediaListQuery } from "../../common/store/slice/api/slice";

const HomeScreen = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetMediaListQuery({});

  return (
    <View style={styles.flex}>
      <Header title={t("header.recent")} />
      <FolderItemsListView data={data} loadings={isLoading} />
    </View>
  );
};

export default HomeScreen;
