import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import Video from "react-native-video";
import { showEditor } from "react-native-video-trim";
import { StickerSmile } from "../../../assets/svgs/svgIcons";
import SaveVideoBottomSheet from "../../../common/components/BottomSheets/SaveVideoBottomSheet/SaveVideoBottomSheet";
import PrimaryButton from "../../../common/components/primaryButton";
import { style } from "./style";

const EditVideo = ({ route, navigation: { goBack } }) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["1", "74%"], []);
  const videoUrl = route.params?.video;
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
    if (index === -1) {
    }
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

  const trimVideo = async () => {
    try {
      const result = await showEditor(videoUrl, {
        maxDuration: 20,
      }).then((res) => console.log("console of res", res));
      console.log("Trimmed video result:", result);
    } catch (error) {
      console.error("Error trimming video:", error);
    }
  };

  return (
    <>
      <TouchableOpacity style={style.back} onPress={() => goBack()}>
        <Ionicons name="chevron-back" size={24} color="black" />
        <Text style={style.backbtn}>Back</Text>
      </TouchableOpacity>
      <View style={style.container}>
        <View style={style.btnContainer}>
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
        <PrimaryButton
          title={t("common.trim")}
          containerStyle={style.trim}
          onPress={trimVideo}
        />
      </View>
      <SaveVideoBottomSheet
        title={t("common.save")}
        ref={bottomSheetModalRef}
        backdropComponent={backdropComponent}
        snapPoints={snapPoints}
        handleClosePress={handleClosePress}
        onChange={handleSheetChanges}
      />
    </>
  );
};

export default EditVideo;
