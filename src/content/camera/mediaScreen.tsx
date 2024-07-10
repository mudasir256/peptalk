import { Text, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import Video from "react-native-video";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { style } from "./videoScreen/style";

const MediaScreen = ({ route, navigation: { goBack } }) => {
  const initialVideoUrl = route.params?.video;
  const [isPaused, setIsPaused] = useState(true);
  const videoRef = useRef(null);
  const { t } = useTranslation();

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <TouchableOpacity style={style.back} onPress={() => goBack()}>
          <Ionicons name="chevron-back" size={24} color="black" />
          <Text style={style.backbtn}>{t("common.back")}</Text>
        </TouchableOpacity>
        <View style={style.container}>
          <TouchableOpacity
            style={style.videoContainer}
            onPress={togglePause}
          ></TouchableOpacity>
          <Video
            ref={videoRef}
            source={{ uri: initialVideoUrl }}
            style={{ width: "100%", height: "90%" }}
            controls={true}
            resizeMode="contain"
            paused={isPaused}
          />
        </View>
      </View>
    </>
  );
};

export default MediaScreen;
