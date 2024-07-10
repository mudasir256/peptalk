import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import React, { forwardRef, useEffect, useState } from "react";
import {
  BottomSheetBackdropProps,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import MoveToFolderView from "../withBottomSheetModal/moveToFolderView";
import CustomModal from "../modal/modal";
import { useTranslation } from "react-i18next";
import useCameraUpload from "../../../content/camera/useCameraUpload";
import RNFS from "react-native-fs";
import { styles } from "./styles";
import { useFoldersData } from "../../../content/folders/foldersList/useFolderListData";
import * as VideoThumbnails from "expo-video-thumbnails";

type Props = {
  index?: number;
  backdropComponent?: React.FC<BottomSheetBackdropProps>;
  snapPoints?: Array<string>;
  onChange?: (index: number) => void;
  handleClosePress?: () => void;
  title: string;
  fileUri?: string;
};

const BottomModal = forwardRef<BottomSheetModal, Props>(
  (
    {
      index = 1,
      backdropComponent,
      snapPoints,
      onChange,
      handleClosePress,
      title,
      fileUri,
    },
    ref
  ) => {
    const {
      addingFolder,
      handleAddFolder,
      data: foldersData,
      isLoadingUpdate,
      isLoading: isLoadingFolders,
      isFetching,
    } = useFoldersData();
    const [thumbnail, setThumbnail] = useState(null);

    useEffect(() => {
      const generateThumbnail = async () => {
        try {
          const { uri } = await VideoThumbnails.getThumbnailAsync(fileUri, {
            time: 15000,
          });
          setThumbnail(uri);
        } catch (e) {
          console.warn(e);
        }
      };
      generateThumbnail();
    }, [thumbnail]);
    const [showAddFolderPopup, setShowAddFolderPopup] = useState(false);
    const [cancelPressed, setCancelPressed] = useState(false);
    const { t } = useTranslation();
    const {
      uploadVideoInChunks,
      uploadProgress,
      isCompleteMediaLoading,
      isInitMediaLoading,
      isUploadMediaLoading,
    } = useCameraUpload();

    useEffect(() => {
      if (
        !isLoadingFolders &&
        !isFetching &&
        foldersData.results.length === 0
      ) {
        setShowAddFolderPopup(true);
      }
    }, [foldersData, showAddFolderPopup]);

    const onAddFolderPress = async (folder: string) => {
      await handleAddFolder(folder);
      setShowAddFolderPopup(false);
    };

    const handleCancelPressed = () => {
      setShowAddFolderPopup(false);
      setCancelPressed(true);
    };

    const handleUploadMedia = async (folderId: string, name: string) => {
      if (folderId) {
        try {
          const stats = await RNFS.stat(fileUri);
          const fileSizeInBytes = stats.size;
          const fileSizeInMB = fileSizeInBytes / (1024 * 1024);
          if (fileSizeInMB > 200) {
            Alert.alert(t("alert.videosize"));
            return;
          }
          await uploadVideoInChunks(fileUri, folderId, name, thumbnail);
          handleClosePress();
        } catch (err) {}
      }
    };
    if (!foldersData || isLoadingFolders || isLoadingUpdate) {
      return null;
    }

    return (
      <>
        <View style={{ flex: 1 }}>
          <BottomSheetModal
            ref={ref}
            index={index}
            backdropComponent={backdropComponent}
            snapPoints={snapPoints}
            onChange={onChange}
          >
            <MoveToFolderView
              fileUri={fileUri}
              title={title}
              handleClosePress={handleClosePress}
              cancelPressed={cancelPressed}
              onSavePress={handleUploadMedia}
              foldersData={foldersData}
            />
            <CustomModal
              visible={showAddFolderPopup}
              onClose={handleCancelPressed}
              title={t("modal.titleModal")}
              showInput
              onPressOk={onAddFolderPress}
              loading={addingFolder}
              showCancel={false}
            />
          </BottomSheetModal>
        </View>
        {(isCompleteMediaLoading ||
          isInitMediaLoading ||
          isUploadMediaLoading ||
          uploadProgress > 0) && (
          <View style={[StyleSheet.absoluteFill, styles.overlay]}>
            <View style={styles.progressContainer}>
              <Text style={styles.progressText}>
                Uploading: {uploadProgress.toFixed(2)}%
              </Text>
              <ActivityIndicator size="large" color="gray" />
            </View>
          </View>
        )}
      </>
    );
  }
);

export default BottomModal;
