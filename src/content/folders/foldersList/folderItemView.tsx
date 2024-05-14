import {
  Text,
  View,
  Image,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";
import React from "react";
import { SPACINGS } from "../../../common/theme/spacing";
import { styles } from "../../../common/theme/styles";
import { COLORS } from "../../../common/theme/colors";
import { Ellipses, Folders } from "../../../assets/svgs/svgIcons";
import { Folder } from "./types";

type Props = {
  folder: Folder;
};

const FolderItemView = ({ folder }: Props) => {
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
        <Ellipses />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    padding: SPACINGS.md,
  },
  imageContainer: {
    borderColor: "#E0E0E0",
    borderWidth: 2,
    borderRadius: 10,
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
    fontSize: 20,
    marginRight: 5,
  },
  folderText: {
    fontSize: 16,
    marginLeft: 8,
  },
  ellipseIcon: {
    color: COLORS.text,
    marginHorizontal: 2,
  },
  folderBottom: {
    ...styles.flexRow,
    ...styles.alignCenter,
    marginTop: 10,
  },
  imageOverlap: {
    marginLeft: -40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
  },
});

export default FolderItemView;
