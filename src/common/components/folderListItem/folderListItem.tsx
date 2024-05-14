import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { style } from "./style";
import { FolderItem } from "../../../content/home/folderItemsList/type";
import {
  Delete,
  Edit,
  MoveFolder,
  PlayIcon,
} from "../../../assets/svgs/svgIcons";

type Props = {
  item: FolderItem;
  onMoveToFolderPress: VoidFunction;
};

export const FolderListItem = ({ item, onMoveToFolderPress }: Props) => {
  return (
    <View style={style.container}>
      <View style={style.imageContainer}>
        <Image source={{ uri: item.image }} style={style.image} />
        <TouchableOpacity style={style.imageIconContainer}>
          <PlayIcon />
        </TouchableOpacity>
      </View>
      <View style={style.details}>
        <View>
          <Text style={style.title}>{item.title}</Text>
          <Text style={style.date}>Folders: {item.name}</Text>
          <Text style={style.date}>Date: {item.date}</Text>
        </View>
        <View style={style.iconsContainer}>
          <TouchableOpacity style={style.iconContainer}>
            <Edit />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onMoveToFolderPress}
            style={style.iconContainer}
          >
            <MoveFolder />
          </TouchableOpacity>
          <TouchableOpacity style={style.iconContainer}>
            <Delete />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
