import React, { useCallback, useMemo, useRef } from "react";
import { View } from "react-native";
import { style } from "./style";
import {
  BottomSheetModal,
  BottomSheetBackdropProps,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { FolderItem } from "./type";
import MoveToFolderView from "../../../common/components/withBottomSheetModal/moveToFolderView";
import { FolderItemsList } from "./folderItemsList";
import { useGetMediaListQuery } from "../../../common/store/slice/api/slice";

const FolderItemsListView = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["1", "74%"], []);
  const { data, isLoading } = useGetMediaListQuery({});

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

  return (
    <View style={style.container}>
      <FolderItemsList
        data={data?.results}
        loading={isLoading}
        onMoveToFolderPress={onMoveToFolderPress}
      />
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        backdropComponent={backdropComponent}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <MoveToFolderView handleClosePress={handleClosePress} />
      </BottomSheetModal>
    </View>
  );
};

export default FolderItemsListView;
