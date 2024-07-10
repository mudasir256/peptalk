import React, { useRef, useState } from "react";
import { View } from "react-native";
import { Camera, useCameraDevice } from "react-native-vision-camera";
import { style } from "./style";
import TimerDisplay from "./timerDisplay";
import CameraControls from "./cameraControls";
import { useNavigation } from "@react-navigation/native";
import CameraPermissionHandler from "../../common/components/cameraPermission/cameraPermissionHandler";
import { CameraStackRoutes } from "../../common/navigation/routes";

const CameraScreen = () => {
  const [deviceState, setDeviceState] = useState("back");
  const cameraRef = useRef(null);
  const { navigate } = useNavigation();
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    if (cameraRef.current) {
      try {
        setIsRecording(true);
        await cameraRef.current.startRecording({
          onRecordingFinished: async (video) => {
            console.log(video);
            const fileUri = video.path;
            setIsRecording(false);
            navigate(CameraStackRoutes.VideoScreen, {
              video: video.path,
              fileUri: fileUri,
            });
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

  return (
    <View style={style.container}>
      <CameraPermissionHandler>
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
      </CameraPermissionHandler>
    </View>
  );
};

export default CameraScreen;
