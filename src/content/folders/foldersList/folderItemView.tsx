import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageSourcePropType,
  Image,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ellipses, Folders } from "../../../assets/svgs/svgIcons";
import Dropdown from "../../../common/components/modal/dropDownModal/dropDown";
import { useTranslation } from "react-i18next";
import { Folder } from "./types";
import { COLORS } from "../../../common/theme/colors";
import { SPACINGS } from "../../../common/theme/spacing";
import { SecondryFont, NormalFont } from "../../../common/theme/typography";
import { styles } from "../../../common/theme/styles";

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
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  const numImages = images.length || 0;
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

  return (
    <View style={style.container}>
      <View
        style={[
          style.imageContainer,
          {
            flexDirection: numImages > 1 ? "row" : "column",
            backgroundColor:
              images.length === 0 ? COLORS.primary : "transparent",
          },
        ]}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            source={image as ImageSourcePropType}
            style={[imageStyle, index > 0 && { ...style.imageOverlap }]}
          />
        ))}
      </View>
      <View style={style.folderBottom}>
        <View style={style.dentist}>
          <Folders />
          <Text style={style.folderText}>{folder.folder_name}</Text>
        </View>
        <TouchableOpacity onPress={onEllipsesPress}>
          <Ellipses />
        </TouchableOpacity>
      </View>
      {showDropdown && (
        <Dropdown
          options={options}
          onClose={() => setShowMoreOptions(false)}
          onSelect={handleOptionSelect}
        />
      )}
    </View>
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
