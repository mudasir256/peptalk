import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Header from "../../common/header/header";
import { styles } from "../../common/theme/styles";
import FolderItemsListView from "./folderItemsList/FolderItemsListView";
import { useTranslation } from "react-i18next";
import { Camera } from "react-native-vision-camera";
import { useGetMediaListQuery } from "../../common/store/slice/api/slice";

const HomeScreen = () => {
  const { t } = useTranslation();
  const [selectedData, setSelectedData] = useState("");
  const { data: defaultData, isLoading: mediaListLoading } =
    useGetMediaListQuery(selectedData);
  console.log(selectedData, "console of selected");
  useEffect(() => {
    const requestPermissions = async () => {
      try {
        await Camera.requestCameraPermission();
        await Camera.requestMicrophonePermission();
      } catch (error) {
        console.error("Error requesting permissions:", error);
      }
    };
    requestPermissions();
  }, []);

  const handleSelect = async (selectedOption) => {
    switch (selectedOption) {
      case t("mediaList.titleA-Z"):
        setSelectedData("=media_name");
        break;
      case t("mediaList.titleZ-A"):
        setSelectedData("=-media_name");
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
        title={t("header.recent")}
        handleSelect={handleSelect}
      />
      <FolderItemsListView data={defaultData} loadings={mediaListLoading} />
    </View>
  );
};

export default HomeScreen;
