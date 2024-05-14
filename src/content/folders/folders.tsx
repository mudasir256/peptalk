import React from "react";
import { View } from "react-native";
import Header from "../../common/header/header";
import { styles } from "../../common/theme/styles";
import { IMAGES } from "../../assets/images";
import FoldersList from "./foldersList/foldersList";
import { Folder } from "./foldersList/types";

const DATA: Folder[] = [
  {
    name: "Dentist",
    images: [IMAGES.rectangle1, IMAGES.rectangle2],
  },
  {
    name: "Doctor",
    images: [IMAGES.rectangle1],
  },
  {
    name: "Sports",
    images: [IMAGES.rectangle1, IMAGES.rectangle2, IMAGES.rectangle3],
  },
  {
    name: "Haircuts",
    images: [
      IMAGES.rectangle1,
      IMAGES.rectangle2,
      IMAGES.rectangle3,
      IMAGES.rectangle1,
    ],
  },
];

const FoldersScreen = () => (
  <View style={styles.flex}>
    <Header title="Folders" iconRight={IMAGES.addFolder} />
    <FoldersList data={DATA} />
  </View>
);

export default FoldersScreen;
