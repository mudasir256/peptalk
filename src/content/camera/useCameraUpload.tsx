import { useState } from "react";
import RNFS from "react-native-fs";
import {
  useUploadMediaCompleteMutation,
  useUploadMediaInitMutation,
  useUploadMediaMutation,
} from "../../common/store/slice/api/slice";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";
import { CommonActions, useNavigation } from "@react-navigation/native";
import {
  CameraStackRoutes,
  HomeStackRoutes,
} from "../../common/navigation/routes";

const useCameraUpload = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [initMedia, { isLoading: isInitMediaLoading }] =
    useUploadMediaInitMutation();
  const [uploadMedia, { isLoading: isUploadMediaLoading }] =
    useUploadMediaMutation();
  const [completeMedia, { isLoading: isCompleteMediaLoading }] =
    useUploadMediaCompleteMutation();
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadVideoInChunks = async (
    fileUri: string,
    folderId: string,
    name: string,
    thumbnail?: string
  ) => {
    const CHUNK_SIZE = 5 * 1024 * 1024;
    try {
      const fileName = fileUri.split("/").pop();
      const fileInfo = await RNFS.stat(fileUri);
      const fileSize = fileInfo.size;
      const totalChunks = Math.ceil(fileSize / CHUNK_SIZE);
      const base64Data = await RNFS.readFile(thumbnail, "base64");

      const initFormData = new FormData();
      initFormData.append("action", "init");
      initFormData.append("media_name", fileName);
      initFormData.append("folder_id", folderId);

      const initResponse = await initMedia(initFormData);
      const uploadId = initResponse.data.upload_id;
      const uploadPath = initResponse.data.upload_path;

      const parts = [];

      for (let chunkNumber = 0; chunkNumber < totalChunks; chunkNumber++) {
        const formData = new FormData();
        formData.append("upload_id", uploadId);
        formData.append("part_number", (chunkNumber + 1).toString());
        formData.append("upload_path", uploadPath);
        //@ts-ignore
        formData.append("file", {
          uri: `file://${fileUri}`,
          name: `${fileName}_chunk_${chunkNumber + 1}.mp4`,
          type: "video/mp4",
        });
        formData.append("action", "upload");

        const uploadResponse = await uploadMedia(formData);
        const progress = ((chunkNumber + 1) / totalChunks) * 100;
        setUploadProgress(progress);

        parts.push({
          PartNumber: uploadResponse.data.PartNumber,
          ETag: uploadResponse.data.ETag,
        });
      }
      const completePayload = {
        action: "complete",
        upload_id: uploadId,
        upload_path: uploadPath,
        media_name: name,
        thumbnail: `data:image/jpeg;base64,${base64Data}`,
        folder_id: folderId,
        parts: parts,
      };

      const completeResponse = await completeMedia(completePayload).unwrap();
      Toast.show({
        type: t("mediaList.success"),
        text1: t("mediaList.uploaded"),
      });
    } catch (error) {
      Toast.show({
        type: t("mediaList.error"),
        text1: t("mediaList.erroruploadingmedia"),
      });
      console.error("File upload failed:", error);
    } finally {
      setUploadProgress(0);
    }
  };

  return {
    uploadVideoInChunks,
    uploadProgress,
    isCompleteMediaLoading,
    isInitMediaLoading,
    isUploadMediaLoading,
  };
};

export default useCameraUpload;
