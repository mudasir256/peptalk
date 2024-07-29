import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Alert,
  ActivityIndicator,
} from "react-native";
import { styles } from "../../../common/theme/styles";
import Header from "../../../common/header/header";
import FolderItemsListView from "../../home/folderItemsList/FolderItemsListView";
import { ImportIcon } from "../../../assets/svgs/svgIcons";
import { StyleSheet } from "react-native";
import { SPACINGS } from "../../../common/theme/spacing";
import { ButtonTextPrimary } from "../../../common/theme/typography";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../common/theme/colors";
import { useTranslation } from "react-i18next";
import { useGetFoldersListByIdQuery } from "../../../common/store/slice/api/slice";
import * as ImagePicker from "expo-image-picker";
import useCameraUpload from "../../../content/camera/useCameraUpload";
import * as VideoThumbnails from "expo-video-thumbnails";

const FolderItems = ({ route, navigation: { goBack } }) => {
  const { t } = useTranslation();
  const [orderingMedia, setOrderingMedia] = useState("");
  const [image, setImage] = useState(null);
  const {
    uploadVideoInChunks,
    uploadProgress,
    isCompleteMediaLoading,
    isInitMediaLoading,
    isUploadMediaLoading,
  } = useCameraUpload();
  const pickImage = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert(t("alert.accesscameraroll"));
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      const fileUri = result.assets[0].uri;
      Alert.prompt(
        t("alert.enteritemnameheading"),
        t("alert.enteritemname"),
        async (name) => {
          if (name) {
            const { uri } = await VideoThumbnails.getThumbnailAsync(fileUri, {
              time: 15000,
            });
            uploadVideoInChunks(fileUri, folderId, name, uri);
          }
        },
        "plain-text"
      );
    }
  };

  console.log("This is folders items");

  const handleSelect = async (selectedOption) => {
    switch (selectedOption) {
      case t("mediaList.titleA-Z"):
        setOrderingMedia("media_name");
        break;
      case t("mediaList.titleZ-A"):
        setOrderingMedia("-media_name");
        break;
      case t("mediaList.dateascending"):
        setOrderingMedia("created_at");
        break;
      case t("mediaList.datedescending"):
        setOrderingMedia("-created_at");
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

  const foldername = route.params?.foldername;
  const folderId = route.params.folderId;
  const {
    data: foldersData,
    isLoading,
    refetch,
    isFetching,
  } = useGetFoldersListByIdQuery({
    id: folderId,
    ordering_media: orderingMedia,
  });

  return (
    <>
      <TouchableOpacity style={style.back} onPress={() => goBack()}>
        <Ionicons name="chevron-back" size={24} color="black" />
        <Text style={style.backbtn}>{t("common.back")}</Text>
      </TouchableOpacity>
      <View style={styles.flex}>
        <Header
          items={options}
          title={foldername}
          handleSelect={handleSelect}
          iconRight={<ImportIcon />}
          onIconRightPress={pickImage}
        />
        <FolderItemsListView
          data={foldersData}
          loadings={isLoading}
          refetch={refetch}
          isFetching={isFetching}
        />
      </View>
      {(isCompleteMediaLoading ||
        isInitMediaLoading ||
        isUploadMediaLoading ||
        uploadProgress > 0) && (
        <View style={[StyleSheet.absoluteFill, style.overlay]}>
          <View style={style.progressContainer}>
            <Text style={style.progressText}>
              Uploading: {Math.round(uploadProgress)}%
            </Text>
            <ActivityIndicator size="large" color="gray" />
          </View>
        </View>
      )}
    </>
  );
};

export default FolderItems;
export const style = StyleSheet.create({
  back: {
    ...styles.alignCenter,
    ...styles.row,
    paddingTop: SPACINGS.sm,
    backgroundColor: COLORS.header,
  },
  backbtn: {
    ...ButtonTextPrimary,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  progressContainer: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    alignItems: "center",
  },
  progressText: {
    fontSize: 18,
    marginBottom: 10,
  },
});
