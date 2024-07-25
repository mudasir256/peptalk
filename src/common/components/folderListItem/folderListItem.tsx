import React, { useRef, useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
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
import DestructiveModal from "../Modals/DestructiveModal/DestructiveModal";
import { useDeleteMediaMutation } from "../../store/slice/api/slice";
import Toast from "react-native-toast-message";

type Props = {
  item: FolderItem;
  onMoveToFolderPress: (id: string) => void;
};

export const FolderListItem = ({ item, onMoveToFolderPress }: Props) => {
  const id = item.id;
  const videoRef = useRef<VideoRef>(null);
  const [isLoadings, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { t } = useTranslation();
  const { handleRenameMedia, handleDeletemedia, loading } = useMediaList();

  const [deleteMedia] = useDeleteMediaMutation({});

  const handleLoadStart = () => {
    setIsLoading(true);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const toggleFullscreen = useCallback(() => {
    setIsLoading(true);
    setIsFullscreen((prevFullscreen) => !prevFullscreen);
  }, []);

  useEffect(() => {
    if (videoRef.current && isFullscreen) {
      videoRef.current.presentFullscreenPlayer();
      setIsLoading(false);
    }
  }, [isFullscreen]);

  const handleDismissVideo = () => {
    setIsFullscreen(false);
    setIsLoading(false);
    if (videoRef.current) {
      videoRef.current.dismissFullscreenPlayer();
    }
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

  // Deleting
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const showDeleteModal = () => {
    setIsDeleteModalVisible(true);
  };

  const handleDeleteMedia = async () => {
    //handleDeletemedia({ id: item.id, media_name: item.media_name });
    //deleteMedia(item.id);

    try {
      await deleteMedia(id).unwrap();
      Toast.show({
        type: t("mediaList.success"),
        text1: `${item.name} ${t("mediaList.itemdeleted")}`,
        position: "bottom",
      });
    } catch (error) {
      Toast.show({
        type: t("mediaList.error"),
        text1: t("mediaList.failedtodeleteitem"),
      });
    }
    setIsDeleteModalVisible(false);
  };

  return (
    <View style={style.container}>
      <View style={style.imageContainer}>
        {isLoadings && (
          <View style={style.imageIconContainer}>
            <ActivityIndicator size="large" />
          </View>
        )}
        {!isFullscreen && (
          <Image
            source={{ uri: item.thumbnail }}
            style={style.image}
            onLoad={handleImageLoad}
          />
        )}
        {!isFullscreen && !isLoadings && (
          <TouchableOpacity
            style={style.imageIconContainer}
            onPress={toggleFullscreen}
          >
            <PlayIcon />
          </TouchableOpacity>
        )}
        {isFullscreen && (
          <Video
            ref={videoRef}
            source={{ uri: item?.media }}
            style={style.image}
            paused={false}
            onLoadStart={handleLoadStart}
            onLoad={handleLoad}
            onFullscreenPlayerDidDismiss={handleDismissVideo}
          />
        )}
      </View>
      <View style={style.details}>
        <View>
          <Text style={style.title}>{item.media_name}</Text>
          <Text style={style.date}>Folder: {item.folder.folder_name}</Text>
          <Text style={style.date}>Date: {formatDate(item.created_at)}</Text>
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
            //onPress={handleDeleteMedia}
            onPress={showDeleteModal}
          >
            <Delete />
          </TouchableOpacity>
        </View>
      </View>

      <DestructiveModal
        visible={isDeleteModalVisible}
        setIsVisible={setIsDeleteModalVisible}
        title={t("alert.deleteMedia")}
        description={t("alert.areYouSureDeleteMedia")}
        onDelete={handleDeleteMedia}
      />
    </View>
  );
};
