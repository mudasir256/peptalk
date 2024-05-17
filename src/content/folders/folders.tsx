import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Header from "../../common/header/header";
import { styles } from "../../common/theme/styles";
import { IMAGES } from "../../assets/images";
import FoldersList from "./foldersList/foldersList";
import { Folder } from "./foldersList/types";
import { useTranslation } from "react-i18next";
import { RootState } from "../../common/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  addFolders,
  deleteFolder,
  updateFolder,
} from "../../common/store/slice/folders/slice";

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

const FoldersScreen = () => {
  const { t } = useTranslation();
  const foldersData = useSelector((state: RootState) => state.folders.folders);
  const dispatch = useDispatch();

  const handleDeleteFolder = (index: number) => {
    dispatch(deleteFolder(index));
  };

  const handleRenameFolder = (index: number, newName: string) => {
    dispatch(updateFolder({ index, newName }));
  };

  useEffect(() => {
    dispatch(addFolders(DATA));
  }, []);

  return (
    <View style={styles.flex}>
      <Header title={t("Folders")} iconRight={IMAGES.addFolder} />
      <FoldersList
        data={foldersData}
        handleDelete={handleDeleteFolder}
        handleRename={(index, newName) => handleRenameFolder(index, newName)}
      />
    </View>
  );
};

export default FoldersScreen;
