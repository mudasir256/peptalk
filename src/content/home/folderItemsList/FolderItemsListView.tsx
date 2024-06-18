import React, { useCallback, useMemo, useRef, useState } from "react";
import { View } from "react-native";
import { style } from "./style";
import {
  BottomSheetModal,
  BottomSheetBackdropProps,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import MoveToFolderView from "../../../common/components/withBottomSheetModal/moveToFolderView";
import { FolderItemsList } from "./folderItemsList";

type Props = {
  id?: string;
  data?: any;
  loadings?: boolean;
};
const FolderItemsListView = ({ loadings, data }: Props) => {
  const [mediaId, setMediaId] = useState("");
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["1", "74%"], []);

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

  return (
    <View style={style.container}>
      <FolderItemsList
        data={data?.results || data?.media}
        loading={loadings}
        onMoveToFolderPress={onMoveToFolderPress}
      />
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        backdropComponent={backdropComponent}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <MoveToFolderView id={mediaId} handleClosePress={handleClosePress} />
      </BottomSheetModal>
    </View>
  );
};

export default FolderItemsListView;
