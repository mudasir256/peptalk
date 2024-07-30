import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ellipses, Folders } from "../../../assets/svgs/svgIcons";
import { useTranslation } from "react-i18next";
import { Folder } from "./types";
import { COLORS } from "../../../common/theme/colors";
import { SPACINGS } from "../../../common/theme/spacing";
import { SecondryFont, NormalFont } from "../../../common/theme/typography";
import { styles } from "../../../common/theme/styles";
import { useNavigation } from "@react-navigation/native";
import { FolderStackRoutes } from "../../../common/navigation/routes";
import DestructiveModal from "../../../common/components/Modals/DestructiveModal/DestructiveModal";
import { useActionSheet } from "@expo/react-native-action-sheet";

type Props = {
  folder: Folder;
  onRenamePress?: VoidFunction;
  handleDeleteFolder?: VoidFunction;
  onEllipsesPress?: VoidFunction;
};

const FolderItemView = ({
  folder,
  onRenamePress,
  handleDeleteFolder,
}: Props) => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const { showActionSheetWithOptions } = useActionSheet();
  const numImages = folder.media.length || 0;
  const imageStyle =
    numImages === 1
      ? [style.singleImage]
      : [style.multiImage, { flex: 1 / numImages }];

  const options = [
    t("dropDown.rename"),
    t("dropDown.delete"),
    t("dropDown.cancel"),
  ];

  useEffect(() => {
    if (folder.media.length === 0) {
      setImageLoading(false);
    }
  }, [folder.media.length]);

  const handleOptionSelect = (selectedIndex: number) => {
    switch (selectedIndex) {
      case 0:
        onRenamePress?.();
        break;
      case 1:
        setIsDeleteModalVisible(true);
        break;
      case 2:
        setShowMoreOptions(false);
        break;
    }
  };

  const handleFolderPress = () => {
    navigate(FolderStackRoutes.FolderItems, {
      foldername: folder.folder_name,
      folderId: folder.id,
    });
  };

  const deleteFolder = () => {
    handleDeleteFolder?.();
    setIsDeleteModalVisible(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
  };

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const onEllipsesPressHandler = () => {
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex: 2,
        destructiveButtonIndex: 1,
      },
      handleOptionSelect
    );
  };

  return (
    <>
      <TouchableOpacity onPress={handleFolderPress} className="p-4">
        <View
          style={[
            style.imageContainer,
            {
              flexDirection: numImages > 1 ? "row" : "column",
              backgroundColor:
                folder.media.length === 0 && !imageLoading
                  ? COLORS.primary
                  : "transparent",
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          {imageLoading && (
            <ActivityIndicator
              style={{ position: "absolute" }}
              size="large"
              color={COLORS.primary}
            />
          )}
          {folder.media.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image.thumbnail }}
              onLoad={handleImageLoad}
              onError={handleImageError}
              style={[imageStyle, index >= 0 && { ...style.imageOverlap }]}
            />
          ))}
        </View>
        <View style={style.rowContainer}>
          <View style={style.rowContent}>
            <Folders />
            <Text style={style.folderName}>{folder.folder_name}</Text>
          </View>
          <TouchableOpacity onPress={onEllipsesPressHandler}>
            <Ellipses />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <DestructiveModal
        visible={isDeleteModalVisible}
        setIsVisible={setIsDeleteModalVisible}
        title={t("alert.deletefolder")}
        description={t("alert.areyousure")}
        onDelete={deleteFolder}
      />
    </>
  );
};

const style = StyleSheet.create({
  container: {
    padding: SPACINGS.md,
  },
  imageContainer: {
    borderRadius: SPACINGS.sm,
    borderWidth: SPACINGS.s,
    borderColor: COLORS.imageBorder,
    height: 162,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  dentist: {
    ...styles.rowCenter,
  },
  singleImage: {
    width: "100%",
    height: "100%",
  },
  multiImage: {
    height: "100%",
  },
  folderIcon: {
    ...SecondryFont,
    marginRight: 5,
  },
  folderText: {
    marginLeft: SPACINGS.xs,
    ...NormalFont,
  },
  ellipseIcon: {
    color: COLORS.text,
    marginHorizontal: SPACINGS.s,
  },
  folderBottom: {
    ...styles.flexRow,
    ...styles.alignCenter,
    marginTop: SPACINGS.sm,
  },
  imageOverlap: {
    borderColor: COLORS.white,
    borderRadius: SPACINGS.sm,
    borderWidth: SPACINGS.s,
    marginLeft: -40,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    alignSelf: "stretch",
  },
  rowContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  folderName: {
    fontSize: 15,
    marginLeft: 2,
    flexGrow: 1,
    flexShrink: 1,
  },
});

export default FolderItemView;
