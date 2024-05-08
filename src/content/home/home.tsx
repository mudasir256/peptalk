import React from "react";
import { View } from "react-native";
import Header from "../../common/header/header";
import { styles } from "../../common/theme/styles";
import FolderItemsList from "./folderItemsList/folderItemsList";

const HomeScreen = () => (
  <View style={styles.flex}>
    <Header title="Recent" />
    <FolderItemsList />
  </View>
)

export default HomeScreen
