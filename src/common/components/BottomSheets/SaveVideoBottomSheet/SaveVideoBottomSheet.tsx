import {
  BottomSheetBackdropProps,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import * as VideoThumbnails from "expo-video-thumbnails";
import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import RNFS from "react-native-fs";
import useCameraUpload from "../../../../content/camera/useCameraUpload";
import { useFoldersData } from "../../../../content/folders/foldersList/useFolderListData";
import AddFolderModal from "../../Modals/AddFolderModal";
import MoveToFolderView from "../../withBottomSheetModal/moveToFolderView";
import { styles } from "./styles";

type Props = {
  index?: number;
  backdropComponent?: React.FC<BottomSheetBackdropProps>;
  snapPoints?: Array<string>;
  onChange?: (index: number) => void;
  handleClosePress?: () => void;
  title: string;
  fileUri?: string;
  thumbnail?: string;
};

const SaveVideoBottomSheetInner = forwardRef<BottomSheetModal, Props>(
  (
    {
      index = 1,
      backdropComponent,
      snapPoints,
      onChange,
      handleClosePress,
      title,
      fileUri,
      thumbnail,
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

    const openAddFolderPopup = useCallback(() => {
      setShowAddFolderPopup(true);
    }, [setShowAddFolderPopup]);

    const [selectedFolderId, setSelectedFolderId] = useState("");

    useEffect(() => {
      if (
        !isLoadingFolders &&
        !isFetching &&
        !cancelPressed &&
        foldersData.results.length === 0
      ) {
        setShowAddFolderPopup(true);
      }
    }, [foldersData, showAddFolderPopup, cancelPressed]);

    const onAddFolderPress = async (folder: string) => {
      handleAddFolder(folder)
        .then((storedFolderData) => {
          if (storedFolderData?.id) {
            setSelectedFolderId(storedFolderData.id);
          }
          setShowAddFolderPopup(false);
          //console.log(storedFolderData, "Wasssssup");
        })
        .catch((error) => {
          console.error(error);
        });
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
              openAddFolderPopup={openAddFolderPopup}
              selectedFolderId={selectedFolderId}
              setSelectedFolderId={setSelectedFolderId}
            />
            <AddFolderModal
              isVisible={showAddFolderPopup}
              onClose={handleCancelPressed}
              onSave={onAddFolderPress}
              isLoading={addingFolder}
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
                Uploading: {Math.round(uploadProgress)}%
              </Text>
              <ActivityIndicator size="large" color="gray" />
            </View>
          </View>
        )}
      </>
    );
  }
);
const SaveVideoBottomSheet = memo(
  forwardRef<BottomSheetModal, Props>(
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
      const [modalKey, setModalKey] = useState(1); // To reset modal state everytime the modal is closed

      const handleSheetChanges = useCallback(
        (index: number) => {
          if (index === -1) {
            setModalKey(modalKey + 1);
            // Modal state is reset on every close
          }
          onChange(index);
        },
        [modalKey]
      );

      const [thumbnail, setThumbnail] = useState<undefined | string>(undefined);

      useEffect(() => {
        //console.log("EFFECT", fileUri);
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
      }, [fileUri]);

      return (
        <SaveVideoBottomSheetInner
          index={index}
          backdropComponent={backdropComponent}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          handleClosePress={handleClosePress}
          title={title}
          fileUri={fileUri}
          thumbnail={thumbnail}
          ref={ref}
          key={modalKey} // Resetting modal state from scratch on every open, like it's the first time to open this modal
        />
      );
    }
  )
);

export default SaveVideoBottomSheet;
