import BottomModal from "../../../common/components/bottomSheetModal/bottomSheetModal";
import { Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import Video from "react-native-video";
import { Ionicons } from "@expo/vector-icons";
import { Edit, StickerSmile } from "../../../assets/svgs/svgIcons";
import PrimaryButton from "../../../common/components/primaryButton";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { CameraStackRoutes } from "../../../common/navigation/routes";
import { style } from "./style";
import { useTranslation } from "react-i18next";

const VideoScreen = ({ route, navigation: { goBack } }) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["1", "74%"], []);
  const videoUrl = route.params?.video;
  const { navigate } = useNavigation();
  const [isPaused, setIsPaused] = useState(true);
  const videoRef = useRef(null);
  const { t } = useTranslation();

  const togglePause = () => {
    setIsPaused(!isPaused);
  };
  const onMoveToFolderPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleClosePress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const backdropComponent = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.48}
      />
    ),
    []
  );
  const handlePressEdit = () => {
    navigate(CameraStackRoutes.EditVideo, { video: videoUrl });
  };

  return (
    <>
      <TouchableOpacity style={style.back} onPress={() => goBack()}>
        <Ionicons name="chevron-back" size={24} color="black" />
        <Text style={style.backbtn}>{t("common.back")}</Text>
      </TouchableOpacity>
      <View style={style.container}>
        <View style={style.btnContainer}>
          <TouchableOpacity
            style={style.iconContainer}
            onPress={handlePressEdit}
          >
            <Edit />
          </TouchableOpacity>
          <TouchableOpacity style={style.iconContainer}>
            <StickerSmile />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={style.videoContainer}
          onPress={togglePause}
        ></TouchableOpacity>
        <Video
          ref={videoRef}
          source={{ uri: `file://${videoUrl}` }}
          style={style.video}
          controls={true}
          resizeMode="contain"
          paused={isPaused}
        />
      </View>
      <View style={style.buttonContainer}>
        <PrimaryButton
          title={t("common.discard")}
          containerStyle={style.discard}
        />
        <PrimaryButton
          title={t("common.save")}
          containerStyle={style.save}
          onPress={onMoveToFolderPress}
        />
      </View>
      <BottomModal
        ref={bottomSheetModalRef}
        backdropComponent={backdropComponent}
        snapPoints={snapPoints}
        handleClosePress={handleClosePress}
        onChange={handleSheetChanges}
      />
    </>
  );
};

export default VideoScreen;
