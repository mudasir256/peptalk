import React, { useState } from "react";
import { View } from "react-native";
import Header from "../../common/header/header";
import { styles } from "../../common/theme/styles";
import FoldersList from "./foldersList/foldersList";
import { useTranslation } from "react-i18next";
import { AddFolder, Folders } from "../../assets/svgs/svgIcons";
import CustomModal from "../../common/components/modal/modal";
import { useFoldersData } from "./useFoldersData";

const FoldersScreen = () => {
  const { t } = useTranslation();
  const { addingFolder, handleAddFolder } = useFoldersData();
  const [showAddFolderPopup, setShowAddFolderPopup] = useState(false);

  const onAddFolderPress = async (folder: string) => {
    await handleAddFolder(folder);
    setShowAddFolderPopup(false);
  };

  return (
    <View style={styles.flex}>
      <Header
        title={t("Folders")}
        iconRight={<AddFolder />}
        onIconRightPress={() => setShowAddFolderPopup(true)}
      />
      <FoldersList />
      <CustomModal
        visible={showAddFolderPopup}
        onClose={() => setShowAddFolderPopup(false)}
        title={t("modal.titleModal")}
        showInput
        onPressOk={onAddFolderPress}
        loading={addingFolder}
      />
    </View>
  );
};

export default FoldersScreen;
