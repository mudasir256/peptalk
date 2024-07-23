import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import MoveToFolderView from "../../../common/components/withBottomSheetModal/moveToFolderView";
import { FolderItemsList } from "./folderItemsList";
import { style } from "./style";

type Props = {
  id?: string;
  data?: any;
  loadings?: boolean;
  onEndReached?: () => void;
};
const FolderItemsListView = ({ loadings, data, onEndReached }: Props) => {
  const { t } = useTranslation();
  const [mediaId, setMediaId] = useState("");
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["1", "74%"], []);
  const [selectedFolderId, setSelectedFolderId] = useState("");

  const onMoveToFolderPress = useCallback((id: string) => {
    bottomSheetModalRef.current?.present();
    setMediaId(id);
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

  const handleEndReached = () => {
    if (onEndReached) {
      onEndReached();
    }
  };

  return (
    <View style={style.container}>
      <FolderItemsList
        data={data?.results || data?.media}
        loading={loadings}
        onMoveToFolderPress={onMoveToFolderPress}
        handleEndReached={handleEndReached}
      />
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        backdropComponent={backdropComponent}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <MoveToFolderView
          title={t("common.move")}
          id={mediaId}
          handleClosePress={handleClosePress}
          selectedFolderId={selectedFolderId}
          setSelectedFolderId={setSelectedFolderId}
        />
      </BottomSheetModal>
    </View>
  );
};

export default FolderItemsListView;
