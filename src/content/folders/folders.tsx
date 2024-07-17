import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Header from "../../common/header/header";
import { styles } from "../../common/theme/styles";
import FoldersList from "./foldersList/foldersList";
import { useTranslation } from "react-i18next";
import { AddFolder } from "../../assets/svgs/svgIcons";
import CustomModal from "../../common/components/modal/modal";
import { useFoldersData } from "./foldersList/useFolderListData";
import { useFoldersListQuery } from "../../common/store/slice/api/slice";
import { useIsFocused } from "@react-navigation/native";

const FoldersScreen = () => {
  const { t } = useTranslation();
  const [selectedData, setSelectedData] = useState("");
  const { addingFolder, handleAddFolder } = useFoldersData();
  const { data, isFetching, refetch } = useFoldersListQuery(selectedData);
  const { results: foldersList = [] } = data || {};
  const [showAddFolderPopup, setShowAddFolderPopup] = useState(false);
  const onAddFolderPress = async (folder: string) => {
    await handleAddFolder(folder);
    setShowAddFolderPopup(false);
    refetch();
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  const handleSelect = async (selectedOption: string) => {
    switch (selectedOption) {
      case t("mediaList.titleA-Z"):
        setSelectedData("=folder_name");
        break;
      case t("mediaList.titleZ-A"):
        setSelectedData("=-folder_name");
        break;
      case t("mediaList.dateascending"):
        setSelectedData("=created_at");
        break;
      case t("mediaList.datedescending"):
        setSelectedData("=-created_at");
        break;
      default:
        break;
    }
  };

  const options = [
    { label: t("mediaList.titleA-Z"), value: t("mediaList.titleA-Z") },
    { label: t("mediaList.titleZ-A"), value: t("mediaList.titleZ-A") },
    {
      label: t("mediaList.dateascending"),
      value: t("mediaList.dateascending"),
    },
    {
      label: t("mediaList.datedescending"),
      value: t("mediaList.datedescending"),
    },
  ];
  return (
    <View style={styles.flex}>
      <Header
        items={options}
        title={t("Folders")}
        iconRight={<AddFolder />}
        handleSelect={handleSelect}
        onIconRightPress={() => setShowAddFolderPopup(true)}
      />
      <FoldersList
        data={foldersList}
        refetch={refetch}
        isFetching={isFetching}
      />
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
