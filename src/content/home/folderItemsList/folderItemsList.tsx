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
import WithBottomSheetModal from "../../../common/components/withBottomSheetModal/withBottomSheetModal";

const data: FolderItem[] = [
  {
    title: "Doctor",
    name: "Doctor",
    date: "10/15/2024",
    image:
      "https://s3-alpha-sig.figma.com/img/3aed/6881/32294e3e2b332c8480b147101b7e0f53?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qvjcDf7hLCPsE1W8cGuT9pb9wXhIZZQ~X~HQl6~dO6FBShwRV4mH1tVwdW5uHFPA~TF17qWeI-esYAg8uqFCAx2ydVmvvg07mkGjuDpqpN10fbMxkdKkt9uyEtGRWURIvo4zaR7aXQYL4wi8k4uf53S4x3CS63qdn-x7jcEKXY-A9l8e09mo4wr7XP~T2JjkAGQnV9Mp1QQ1vJJJPX37hcOKICxsiTlBqT~Cu5~JwNeLvd~-JHl37KaixuClFk~f~~Bprc8A9lMiPHPGgnqfGLCw60bjowMEfdXeRP5QWEa87s6Y0nXGnEZcLwBLeA9XOC0yPEZutCyFARRgA7ipsQ__",
  },
  {
    title: "Trip to the Dentist",
    name: "Dentist",
    date: "10/15/2024",
    image:
      "https://s3-alpha-sig.figma.com/img/1f97/0bb5/faf17fd2291f8c81839c3f73cbb5ce40?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VTEfsSTp9m1JffaJsfXBR07abpxGN-FMsvQRB7h~ywWwh7PuduhTe8PuyR0hsj1pS7wh687PcsdalfkknbhfpOAyOqiRip-1GYcWQdsSUC8ZSa2xLsiQbIf04RXh0-E09tWxBlJKFFtNR16iKjcR4jY4mJpJ03alBzcaaJiotkx4vCJdnaPpxHrFLWifyzE8h19jzqs36CB0uv5rIGfD~gvEOJRvdKpyHHZUFlpdAOG-IqVP9L4c3vfdEjgYvEQBfSNeHrg-HH1CVwyNH9gxPq5r~P~rGQ1vIabLW6EhN6exgA0Hk0qnfsDd6NHyV-auzq-lqsVKjdAz0oYBpznbdA__",
  },
  {
    title: "Soccer Game",
    name: "Sports",
    date: "10/15/2024",
    image:
      "https://s3-alpha-sig.figma.com/img/cb47/fd92/952db4cc8359f2c61bad4cead959056d?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qmbry6ywFFBqd9Fhy4rVbeKsH~8dFuNrt9EmK9hGP8VnUlzqKv4x01J~ZRWDje2VSvqi-QMEhCQMNboC4u1q8AZQ1Oq3djzVbCAaaWfLQMgVM3Tq-k6s9xhqRxeouKXfvmxm7p4qIuNUkcc1Dc1K~f07IzyVe5jBOUEmeDK2QbUE6lb52bH6KV2A1Ga5s9UzC9cnKkJR~M11Lb0NabyTGmgJXkuOHL3RsrIaWwKOuL3wN-hEZTmEhwNxAyKhbB1OqvZkhGLbSBhJD-q7Hw1uFSdjpW6gkEjL6n6pgmfh1gb6uA~dlIusB0hexcX5aAth6WnPQ2reVOJgnfTzmeFbEw__",
  },
  {
    title: "Doctor",
    name: "Doctor",
    date: "10/15/2024",
    image:
      "https://s3-alpha-sig.figma.com/img/3aed/6881/32294e3e2b332c8480b147101b7e0f53?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qvjcDf7hLCPsE1W8cGuT9pb9wXhIZZQ~X~HQl6~dO6FBShwRV4mH1tVwdW5uHFPA~TF17qWeI-esYAg8uqFCAx2ydVmvvg07mkGjuDpqpN10fbMxkdKkt9uyEtGRWURIvo4zaR7aXQYL4wi8k4uf53S4x3CS63qdn-x7jcEKXY-A9l8e09mo4wr7XP~T2JjkAGQnV9Mp1QQ1vJJJPX37hcOKICxsiTlBqT~Cu5~JwNeLvd~-JHl37KaixuClFk~f~~Bprc8A9lMiPHPGgnqfGLCw60bjowMEfdXeRP5QWEa87s6Y0nXGnEZcLwBLeA9XOC0yPEZutCyFARRgA7ipsQ__",
  },
  {
    title: "Trip to the Dentist",
    name: "Dentist",
    date: "10/15/2024",
    image:
      "https://s3-alpha-sig.figma.com/img/cb47/fd92/952db4cc8359f2c61bad4cead959056d?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qmbry6ywFFBqd9Fhy4rVbeKsH~8dFuNrt9EmK9hGP8VnUlzqKv4x01J~ZRWDje2VSvqi-QMEhCQMNboC4u1q8AZQ1Oq3djzVbCAaaWfLQMgVM3Tq-k6s9xhqRxeouKXfvmxm7p4qIuNUkcc1Dc1K~f07IzyVe5jBOUEmeDK2QbUE6lb52bH6KV2A1Ga5s9UzC9cnKkJR~M11Lb0NabyTGmgJXkuOHL3RsrIaWwKOuL3wN-hEZTmEhwNxAyKhbB1OqvZkhGLbSBhJD-q7Hw1uFSdjpW6gkEjL6n6pgmfh1gb6uA~dlIusB0hexcX5aAth6WnPQ2reVOJgnfTzmeFbEw__",
  },
  {
    title: "Soccer Game",
    name: "Sports",
    date: "10/15/2024",
    image:
      "https://s3-alpha-sig.figma.com/img/3aed/6881/32294e3e2b332c8480b147101b7e0f53?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qvjcDf7hLCPsE1W8cGuT9pb9wXhIZZQ~X~HQl6~dO6FBShwRV4mH1tVwdW5uHFPA~TF17qWeI-esYAg8uqFCAx2ydVmvvg07mkGjuDpqpN10fbMxkdKkt9uyEtGRWURIvo4zaR7aXQYL4wi8k4uf53S4x3CS63qdn-x7jcEKXY-A9l8e09mo4wr7XP~T2JjkAGQnV9Mp1QQ1vJJJPX37hcOKICxsiTlBqT~Cu5~JwNeLvd~-JHl37KaixuClFk~f~~Bprc8A9lMiPHPGgnqfGLCw60bjowMEfdXeRP5QWEa87s6Y0nXGnEZcLwBLeA9XOC0yPEZutCyFARRgA7ipsQ__",
  },
];

const FolderItemsList = () => {
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

  const renderFolderListItem: ListRenderItem<FolderItem> = ({ item }) => (
    <FolderListItem item={item} onMoveToFolderPress={onMoveToFolderPress} />
  );

  return (
    <View style={style.container}>
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
        <WithBottomSheetModal handleClosePress={handleClosePress} />
      </BottomSheetModal>
    </View>
  );
};

export default FolderItemsList;
