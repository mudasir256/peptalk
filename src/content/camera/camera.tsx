import React, { useRef, useState } from "react";
import { View } from "react-native";
import { Camera, useCameraDevice } from "react-native-vision-camera";
import { style } from "./style";
import TimerDisplay from "./timerDisplay";
import CameraControls from "./cameraControls";
import { useNavigation } from "@react-navigation/native";
import { CameraStackRoutes } from "../../common/navigation/routes";
import RequestCameraPermission from "../../common/components/permissions/requestCameraPermission";
import RNFS from "react-native-fs";
import { useUploadMediaMutation } from "../../common/store/slice/api/slice";

const CameraScreen = () => {
  const [deviceState, setDeviceState] = useState("back");
  const cameraRef = useRef(null);
  const { navigate } = useNavigation();
  const [isRecording, setIsRecording] = useState(false);
  const [uploadMedia, { isLoading }] = useUploadMediaMutation();

  const startRecording = async () => {
    if (cameraRef.current) {
      try {
        setIsRecording(true);
        await cameraRef.current.startRecording({
          onRecordingFinished: async (video) => {
            console.log(video);
            const fileUri = video.path;
            setIsRecording(false);
            // await uploadVideoInChunks(fileUri);
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

  const uploadVideoInChunks = async (fileUri) => {
    const CHUNK_SIZE = 5 * 1024 * 1024;

    try {
      const fileName = fileUri.split("/").pop();
      const fileInfo = await RNFS.stat(fileUri);
      const fileSize = fileInfo.size;
      const totalChunks = Math.ceil(fileSize / CHUNK_SIZE);
      // console.log(fileInfo, "console of fileinfo");
      // console.log(fileSize, "console of fileSize");
      // console.log(totalChunks, "console of totalChunks");
      // console.log(fileName, "console of fileName");

      const formData1 = new FormData();
      formData1.append("action", "init");
      formData1.append("media_name", fileName);
      formData1.append("folder_id", "1308ba5a-3636-4d90-b152-aa57d5ffdd48");
      const initResponse = await uploadMedia(formData1);
      const uploadId = initResponse.data.upload_id;
      const uploadPath = initResponse.data.upload_path;
      // console.log(uploadId, "console of uploadid");
      // console.log(uploadPath, "console of upload path");

      const parts = [];

      for (let chunkNumber = 0; chunkNumber < totalChunks; chunkNumber++) {
        const start = chunkNumber * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, fileSize);
        const chunk = await RNFS.read(fileUri, end - start, start, "base64");

        // Convert base64 chunk to Blob
        const blob = await fetch(
          `data:application/octet-stream;base64,${chunk}`
        ).then((response) => response.blob());

        // Convert Blob to File
        const file = new File(
          [blob],
          `${fileName}_chunk_${chunkNumber + 1}.mp4`
        );

        // Upload each chunk
        const formData2 = new FormData();
        formData2.append("upload_id", uploadId);
        formData2.append("part_number", (chunkNumber + 1).toString());
        formData2.append("upload_path", uploadPath);
        formData2.append("file", file);
        formData2.append("action", "upload");
        const chunkResponse = await uploadMedia(formData2);
        console.log(chunkResponse, "console of chunk");

        parts.push({
          PartNumber: chunkResponse.data.PartNumber,
          ETag: chunkResponse.data.ETag,
        });
      }
      console.log(parts, "console of parts");
      const formData3 = new FormData();
      formData3.append("action", "complete");
      formData3.append("upload_id", uploadId);
      formData3.append("upload_path", uploadPath);
      formData3.append("media_name", fileName);
      formData3.append("folder_id", "1308ba5a-3636-4d90-b152-aa57d5ffdd48");
      formData3.append("parts", JSON.stringify(parts));
      console.log(formData3, "console of formdata3");
      const completeResponse = await uploadMedia(formData3);
      console.log("Complete response:", completeResponse);
      console.log("File uploaded successfully");
    } catch (error) {
      console.error("File upload failed:", error);
    }
  };

  return (
    <View style={style.container}>
      <RequestCameraPermission />
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
