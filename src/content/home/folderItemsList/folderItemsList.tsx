
import { FlatList, ListRenderItem } from 'react-native';
import { SPACINGS } from '../../../common/theme/spacing';
import { FolderListItem } from '../../../common/components/folderListItem/folderListItem';
import HomeFolder from '../../../common/components/homeFolder/homeFolder';
import PrimaryButton from '../../../common/components/primaryButton';
import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text } from 'react-native';
import { IMAGES } from '../../../assets/images';
import IconButton from './iconButton';
import { style } from './style';
import {
  BottomSheetModal,
  BottomSheetBackdropProps,
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { FolderItem } from './type';
import { styles } from '../../../common/theme/styles';
import WithBottomSheetModal from '../../../common/components/withBottomSheetModal/withBottomSheetModal';


const data: FolderItem[] = [
  {
    title: 'Item 1',
    name: 'name',
    date: 'April 24, 2024',
    image: 'https://s3-alpha-sig.figma.com/img/1f97/0bb5/faf17fd2291f8c81839c3f73cbb5ce40?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WditFP07TN5Fq34OKa1q0fYF4afEm4E8LKxXVnnsCjPhkMXYr8mBABtK90K2TP2SDZ7R0qfQpt5kcdVhuajEaQwMBESG6jh~cCkOlYmldVyD9Ph7wVePQ~YKePn39hRySWXsGmBIw3IvCtev6273jumvQVGqivDaA885ZpyZgiyPCVvf1n-BbWBFNws4iLy4jhNb6OQtZXSnKuf7vZvQBWcO12tsLEJxMJf~At4-VHA8RyxNtgNinYXXx6QAXDOzFA6Qt6ZM5WwFqeIR1Ww-PEF7-YH1MZRB06MEUXimL4vQoAZQvQRV0i5tDjUk7JgVVvIQHCn-hAgXTvfQmOxTHA__'
  },
  {
    title: 'Item 2',
    name: 'named',
    date: 'April 25, 2024',
    image: 'https://s3-alpha-sig.figma.com/img/cb47/fd92/952db4cc8359f2c61bad4cead959056d?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=H8nTvH9t5hKChN3jN4xWA2wqoK-fkdlJ9LD2soeUQZTABL1fI6aEIqpvSZElMtKBpbp7IvuqQF4Z25KOEfoM~isC52xy3RGkkxBAZluT1EFvEb26x2Dd9Y10NkVe4B5T4fiizjJVumsBv7zx-t5nY0tIyHpHd9G39Ia91YO6WRUfzRaL-F7Pn5Ah9k3mxbkG9K~Y4anbbo5sUcV6KtqwZhmoHtjYtYCTmDcMHgHRYRZCKU4vjpzBrAFRwAZRik7V3ftecWbZpGcEGzXIxBvx3BNTzqKCYeEdBP-wD99KuTUS06Xa5~T3DcH2dS1D0q55T6-5MzIpvCsrcCdQW1JLyg__'
  },
  {
    title: 'Item 3',
    name: 'names',
    date: 'April 26, 2024',
    image: 'https://s3-alpha-sig.figma.com/img/3aed/6881/32294e3e2b332c8480b147101b7e0f53?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=k3N3KS4SmPh0GOATDqNIFZ~EqwewpsM4MWzgiOSlmtnKjdp6Rh8N3JwWsk7qCMobQ~ESM5hMjOxDsVHO6Q975Kefy9MBP-Lp9qEoMJtDK88UVmr3W0sDkQ1cRpl5eoYk~NIvVTQG88khGzUJ90P8vkD-HsW-J1BQx1qcWvJQMVVpTObATu-f5oGnn6qG~tQ~dIBbQ3rY92HzRGM3WE8evAC9G-ZoSJXSo~JBK~fCoMy2NfXQ4m9ldDToQd9H4TbPe-gY2m3VQ2kqWbrZkW6pTaXHfGCD6~m1a9PeRxuWnCxkPwx9BlvcQwUkEZd3t~-QinSJAPTDi4pH0rVDt6mPCQ__'
  },
  {
    title: 'Item 3',
    name: 'names',
    date: 'April 26, 2024',
    image: 'https://s3-alpha-sig.figma.com/img/3aed/6881/32294e3e2b332c8480b147101b7e0f53?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=k3N3KS4SmPh0GOATDqNIFZ~EqwewpsM4MWzgiOSlmtnKjdp6Rh8N3JwWsk7qCMobQ~ESM5hMjOxDsVHO6Q975Kefy9MBP-Lp9qEoMJtDK88UVmr3W0sDkQ1cRpl5eoYk~NIvVTQG88khGzUJ90P8vkD-HsW-J1BQx1qcWvJQMVVpTObATu-f5oGnn6qG~tQ~dIBbQ3rY92HzRGM3WE8evAC9G-ZoSJXSo~JBK~fCoMy2NfXQ4m9ldDToQd9H4TbPe-gY2m3VQ2kqWbrZkW6pTaXHfGCD6~m1a9PeRxuWnCxkPwx9BlvcQwUkEZd3t~-QinSJAPTDi4pH0rVDt6mPCQ__'
  },
  {
    title: 'Item 3',
    name: 'names',
    date: 'April 26, 2024',
    image: 'https://s3-alpha-sig.figma.com/img/3aed/6881/32294e3e2b332c8480b147101b7e0f53?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=k3N3KS4SmPh0GOATDqNIFZ~EqwewpsM4MWzgiOSlmtnKjdp6Rh8N3JwWsk7qCMobQ~ESM5hMjOxDsVHO6Q975Kefy9MBP-Lp9qEoMJtDK88UVmr3W0sDkQ1cRpl5eoYk~NIvVTQG88khGzUJ90P8vkD-HsW-J1BQx1qcWvJQMVVpTObATu-f5oGnn6qG~tQ~dIBbQ3rY92HzRGM3WE8evAC9G-ZoSJXSo~JBK~fCoMy2NfXQ4m9ldDToQd9H4TbPe-gY2m3VQ2kqWbrZkW6pTaXHfGCD6~m1a9PeRxuWnCxkPwx9BlvcQwUkEZd3t~-QinSJAPTDi4pH0rVDt6mPCQ__'
  }, {
    title: 'Item 3',
    name: 'names',
    date: 'April 26, 2024',
    image: 'https://s3-alpha-sig.figma.com/img/3aed/6881/32294e3e2b332c8480b147101b7e0f53?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=k3N3KS4SmPh0GOATDqNIFZ~EqwewpsM4MWzgiOSlmtnKjdp6Rh8N3JwWsk7qCMobQ~ESM5hMjOxDsVHO6Q975Kefy9MBP-Lp9qEoMJtDK88UVmr3W0sDkQ1cRpl5eoYk~NIvVTQG88khGzUJ90P8vkD-HsW-J1BQx1qcWvJQMVVpTObATu-f5oGnn6qG~tQ~dIBbQ3rY92HzRGM3WE8evAC9G-ZoSJXSo~JBK~fCoMy2NfXQ4m9ldDToQd9H4TbPe-gY2m3VQ2kqWbrZkW6pTaXHfGCD6~m1a9PeRxuWnCxkPwx9BlvcQwUkEZd3t~-QinSJAPTDi4pH0rVDt6mPCQ__'
  }
];

const foldersData = [
  "Dentist",
  "Doctor",
  "Haircuts",
  "Sports",
  "Outdoors",
  "Birthday Party",
];

const FolderItemsList = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['1', '70%'], []);

  const onMoveToFolderPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
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

  const renderFolderListItem: ListRenderItem<FolderItem> = ({ item }) =>
    <FolderListItem item={item} onMoveToFolderPress={onMoveToFolderPress} />

  return (
    <View style={styles.flex}>
      <FlatList
        style={{ flex: 1, padding: SPACINGS.md }}
        contentContainerStyle={{ paddingBottom: 20 }}
        data={data}
        renderItem={renderFolderListItem}
        keyExtractor={(_item, index) => index.toString()}
      />

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
    </View>
  );
};

export default FolderItemsList;