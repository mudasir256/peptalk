import React, { useRef, useState } from "react";
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
import { useMediaList } from "./useMediaList";
import { useTranslation } from "react-i18next";

type Props = {
  item: FolderItem;
  onMoveToFolderPress: (id: string) => void;
};

export const FolderListItem = ({ item, onMoveToFolderPress }: Props) => {
  const id = item.id;
  const videoRef = useRef<VideoRef>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoadings, setIsLoading] = useState(true);
  const [isPlayIcon, setIsPlayIcon] = useState(false);
  const { t } = useTranslation();
  const { handleRenameMedia, handleDeletemedia, loading } = useMediaList();

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
      t("months.January"),
      t("months.february"),
      t("months.march"),
      t("months.april"),
      t("months.may"),
      t("months.june"),
      t("months.july"),
      t("months.august"),
      t("months.september"),
      t("months.october"),
      t("months.november"),
      t("months.december"),
    ];
    return `${
      monthNames[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  };
  return (
    <View style={style.container}>
      <View style={style.imageContainer}>
        {isLoadings && (
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
          <Text style={style.date}>
            {t("header.folder")}: {item.folder.folder_name}
          </Text>
          <Text style={style.date}>
            {t("common.date")}: {formatDate(item.created_at)}
          </Text>
        </View>
        <View style={style.iconsContainer}>
          <TouchableOpacity
            onPress={() => handleRenameMedia({ id: id })}
            style={style.iconContainer}
          >
            <Edit />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onMoveToFolderPress(id)}
            style={style.iconContainer}
          >
            <MoveFolder />
          </TouchableOpacity>
          <TouchableOpacity
            style={style.iconContainer}
            onPress={() =>
              handleDeletemedia({ id: item.id, media_name: item.media_name })
            }
          >
            <Delete />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
