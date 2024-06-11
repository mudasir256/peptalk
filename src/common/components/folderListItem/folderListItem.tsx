import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { style } from "./style";
import { FolderItem } from "../../../content/home/folderItemsList/type";
import {
  Delete,
  Edit,
  MoveFolder,
  PlayIcon,
} from "../../../assets/svgs/svgIcons";
import Video, { VideoRef } from "react-native-video";

type Props = {
  item: FolderItem;
  onMoveToFolderPress: VoidFunction;
};

export const FolderListItem = ({ item, onMoveToFolderPress }: Props) => {
  const videoRef = useRef<VideoRef>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlayIcon, setIsPlayIcon] = useState(false);

  const handleLoadStart = () => {
    setIsLoading(true);
  };

  const handleLoad = () => {
    setIsLoading(false);
    setIsPlayIcon(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    videoRef.current.presentFullscreenPlayer();
  };
  const handleDismissVideo = () => {
    videoRef.current.dismissFullscreenPlayer();
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${
      monthNames[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  };

  return (
    <View style={style.container}>
      <View style={style.imageContainer}>
        {isLoading && (
          <View style={style.imageIconContainer}>
            <ActivityIndicator size="large" />
          </View>
        )}
        <Video
          ref={videoRef}
          source={{ uri: item?.media }}
          style={style.image}
          paused={!isPlaying}
          onLoadStart={handleLoadStart}
          onLoad={handleLoad}
          onFullscreenPlayerDidDismiss={handleDismissVideo}
        />
        {isPlayIcon && (
          <TouchableOpacity
            style={style.imageIconContainer}
            onPress={togglePlay}
          >
            <PlayIcon />
          </TouchableOpacity>
        )}
      </View>
      <View style={style.details}>
        <View>
          <Text style={style.title}>{item.media_name}</Text>
          <Text style={style.date}>Folders: {item.folder.folder_name}</Text>
          <Text style={style.date}>
            Date: {formatDate(item.folder.created_at)}
          </Text>
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
