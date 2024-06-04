import { FlatList, ListRenderItem } from "react-native";
import { SPACINGS } from "../../../common/theme/spacing";
import { FolderListItem } from "../../../common/components/folderListItem/folderListItem";
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

const data: FolderItem[] = [
  {
    title: "Doctor",
    name: "Doctor",
    date: "10/15/2024",
    image: "https://picsum.photos/375/450",
  },
  {
    title: "Trip to the Dentist",
    name: "Dentist",
    date: "10/15/2024",
    image: "https://picsum.photos/375/450",
  },
  {
    title: "Soccer Game",
    name: "Sports",
    date: "10/15/2024",
    image: "https://picsum.photos/375/450",
  },
  {
    title: "Doctor",
    name: "Doctor",
    date: "10/15/2024",
    image: "https://picsum.photos/375/450",
  },
  {
    title: "Trip to the Dentist",
    name: "Dentist",
    date: "10/15/2024",
    image: "https://picsum.photos/375/450",
  },
  {
    title: "Soccer Game",
    name: "Sports",
    date: "10/15/2024",
    image: "https://picsum.photos/375/450",
  },
];

const FolderItemsListView = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["1", "74%"], []);

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
      <FolderItemsList data={data} onMoveToFolderPress={onMoveToFolderPress} />
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
