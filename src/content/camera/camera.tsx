import React, { useEffect, useRef, useState } from "react";
import { View, Text } from "react-native";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";
import { style } from "./style";
import TimerDisplay from "./timerDisplay";
import CameraControls from "./cameraControls";
import { useNavigation } from "@react-navigation/native";
import { CameraStackRoutes } from "../../common/navigation/routes";
import { useTranslation } from "react-i18next";

const CameraScreen = () => {
  const [deviceState, setDeviceState] = useState("back");
  const cameraRef = useRef(null);
  const { navigate } = useNavigation();
  const { hasPermission } = useCameraPermission();
  const [isRecording, setIsRecording] = useState(false);
  const deviceStatus = useCameraDevice("back");
  const { t } = useTranslation();

  useEffect(() => {
    const requestPermissions = async () => {
      await Camera.requestCameraPermission();
      await Camera.requestMicrophonePermission();
    };
    requestPermissions();
  }, []);

  const startRecording = async () => {
    if (cameraRef.current) {
      try {
        setIsRecording(true);
        await cameraRef.current.startRecording({
          onRecordingFinished: async (video) => {
            console.log(video);
            const path = video.path;
            setIsRecording(false);
            navigate(CameraStackRoutes.VideoScreen, { video: video.path });
          },
          onRecordingError: (error) => {
            console.error(error);
            setIsRecording(false);
          },
        });
      } catch (e) {
        console.error(e);
        setIsRecording(false);
      }
    }
  };

  const stopRecording = async () => {
    if (cameraRef.current && isRecording) {
      try {
        setIsRecording(false);
        await cameraRef.current.stopRecording();
      } catch (e) {
        console.error(e);
        setIsRecording(false);
      }
    }
  };

  const handleCameraSwitch = () => {
    setDeviceState((prevState) => (prevState === "back" ? "front" : "back"));
  };

  if (!hasPermission)
    return (
      <View>
        <Text>{t("camera.nocamera")}</Text>
      </View>
    );
  if (deviceStatus == null)
    return (
      <View style={style.container}>
        <Text>{t("camera.nodevice")}</Text>
      </View>
    );

  return (
    <View style={style.container}>
      <Camera
        style={style.camera}
        device={useCameraDevice(deviceState === "back" ? "back" : "front")}
        isActive={true}
        video={true}
        audio={true}
        ref={cameraRef}
      />
      <CameraControls
        isRecording={isRecording}
        onStartRecording={startRecording}
        onStopRecording={stopRecording}
        onCameraSwitch={handleCameraSwitch}
      />
      <TimerDisplay isRecording={isRecording} />
    </View>
  );
};

export default CameraScreen;
