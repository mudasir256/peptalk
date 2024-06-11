import { StyleSheet, Text, View } from "react-native";
import React, { forwardRef } from "react";
import {
  BottomSheetBackdropProps,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import MoveToFolderView from "../withBottomSheetModal/moveToFolderView";

type Props = {
  index?: number;
  backdropComponent?: React.FC<BottomSheetBackdropProps>;
  snapPoints?: Array<string>;
  onChange?: (index: number) => void;
  handleClosePress?: () => void;
};

const BottomModal = forwardRef<BottomSheetModal, Props>(
  (
    { index = 1, backdropComponent, snapPoints, onChange, handleClosePress },
    ref
  ) => {
    console.log("ref", ref);
    return (
      <View>
        <BottomSheetModal
          ref={ref}
          index={index}
          backdropComponent={backdropComponent}
          snapPoints={snapPoints}
          onChange={onChange}
        >
          <MoveToFolderView handleClosePress={handleClosePress} />
        </BottomSheetModal>
      </View>
    );
  }
);

export default BottomModal;

const styles = StyleSheet.create({});
