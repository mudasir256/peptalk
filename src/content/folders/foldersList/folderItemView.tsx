import React, { useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ellipses, Folders } from "../../../assets/svgs/svgIcons";
import Dropdown from "../../../common/components/modal/dropDownModal/dropDown";
import { useTranslation } from "react-i18next";
import { Folder } from "./types";
import { COLORS } from "../../../common/theme/colors";
import { SPACINGS } from "../../../common/theme/spacing";
import { SecondryFont, NormalFont } from "../../../common/theme/typography";
import { styles } from "../../../common/theme/styles";
import { useNavigation } from "@react-navigation/native";
import { FolderStackRoutes } from "../../../common/navigation/routes";

type Props = {
  folder: Folder;
  onRenamePress?: VoidFunction;
  onDeletePress?: VoidFunction;
  showDropdown?: boolean;
  onEllipsesPress?: VoidFunction;
};

const FolderItemView = ({
  folder,
  onRenamePress,
  onDeletePress,
  onEllipsesPress,
  showDropdown,
}: Props) => {
  const { images = [] } = folder || {};
  const { t } = useTranslation();
  const { navigate } = useNavigation();
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const numImages = folder.media.length || 0;
  const imageStyle =
    numImages === 1
      ? [style.singleImage]
      : [style.multiImage, { flex: 1 / numImages }];

  const options = [
    { label: t("dropDown.rename"), value: "rename" },
    { label: t("dropDown.delete"), value: "delete" },
  ];

  const handleOptionSelect = async (option: string) => {
    if (option === "delete") onDeletePress?.();
    else if (option === "rename") onRenamePress?.();
    setShowMoreOptions(false);
  };
  const handleFolderPress = () => {
    navigate(FolderStackRoutes.FolderItems, {
      foldername: folder.folder_name,
      folderId: folder.id,
    });
  };
  return (
    <>
      <TouchableOpacity onPress={handleFolderPress} className=" p-4">
        <View
          style={[
            style.imageContainer,
            {
              flexDirection: numImages > 1 ? "row" : "column",
              backgroundColor:
                folder.media.length === 0 ? COLORS.primary : "transparent",
            },
          ]}
        >
          {folder.media.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image.thumbnail }}
              style={[imageStyle, index >= 0 && { ...style.imageOverlap }]}
            />
          ))}
        </View>
        <View className="flex-row justify-between items-center mt-[10px] self-stretch">
          <View className="flex-row items-center justify-center flex-1">
            <Folders />
            <Text className="text-[15px] grow shrink ml-2">
              {folder.folder_name}
            </Text>
          </View>
          <TouchableOpacity onPress={onEllipsesPress}>
            <Ellipses />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      {showDropdown && (
        <Dropdown
          options={options}
          onClose={() => setShowMoreOptions(false)}
          onSelect={handleOptionSelect}
        />
      )}
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
});

export default FolderItemView;
