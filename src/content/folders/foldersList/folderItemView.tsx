import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ImageSourcePropType,
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
import CustomModal from "../../../common/components/modal/modal";

type Props = {
  folder: Folder;
  isOpen?: boolean;
  toggleDropdown: VoidFunction;
  updateFolder: (index: number, newName: string) => void;
  handleDelete: () => void;
};

const FolderItemView: React.FC<Props> = ({
  folder,
  isOpen,
  toggleDropdown,
  handleDelete,
  updateFolder,
}) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const options = [
    { label: t("dropDown.rename"), value: "rename" },
    { label: t("dropDown.delete"), value: "delete" },
  ];

  const handleClose = () => {
    setShowModal(false);
  };

  const handleOptionSelect = (option: string) => {
    if (option === "delete") {
      handleDelete();
    }
    if (option === "rename") {
      setShowModal(true);
    }
    toggleDropdown();
  };

  const numImages = folder.images.length;
  const imageStyle =
    numImages === 1
      ? [style.singleImage]
      : [style.multiImage, { flex: 1 / numImages }];

  return (
    <View style={style.container}>
      <View
        style={[
          style.imageContainer,
          { flexDirection: numImages > 1 ? "row" : "column" },
        ]}
      >
        {folder.images.map((image, index) => (
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
          <Text style={style.folderText}>{folder.name}</Text>
        </View>
        <TouchableOpacity onPress={toggleDropdown}>
          <Ellipses />
        </TouchableOpacity>
      </View>
      {isOpen && <Dropdown options={options} onSelect={handleOptionSelect} />}
      {showModal && (
        <CustomModal
          title={"Update Folder Name"}
          showInput
          onClose={handleClose}
          onPressOk={updateFolder}
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
