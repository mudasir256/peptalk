import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, FlatList } from 'react-native';
import { IMAGES } from '../../../assets/images';
import HomeFolder from '../../../common/components/homeFolder/homeFolder';
import PrimaryButton from '../../../common/components/primaryButton';
import { style } from './style';
import IconButton from '../../../content/home/folderItemsList/iconButton';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdropProps,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';


const foldersData = [
  "Dentist",
  "Doctor",
  "Haircuts",
  "Sports",
  "Outdoors",
  "Birthday Party",
];


const WithBottomSheetModal = () => {

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['1', '70%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
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
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={1}
      backdropComponent={backdropComponent}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
    >
      <BottomSheetView style={style.modalContainer}>
        <View style={style.head}>
          <Text style={style.move}>Move</Text>
          <IconButton icon={IMAGES.close} />
        </View>
        <FlatList
          data={foldersData}
          renderItem={({ item }) => (
            <HomeFolder name={item} />
          )}
          keyExtractor={(index) => index.toString()}
          contentContainerStyle={style.folder}
        />
      </BottomSheetView>
      <View style={style.buttonContainer}>
        <PrimaryButton
          title={"Folder"}
          containerStyle={style.button}
        />
      </View>
    </BottomSheetModal>
  )
}

export default WithBottomSheetModal